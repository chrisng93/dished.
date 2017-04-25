import requests
from urllib.parse import urlparse
from math import sqrt, cos, sin, radians, degrees, asin, atan2
from .. import config
from ..common.exceptions import TakingTooLong, GoogleMapsError


def miles_to_meters(miles):
    return miles * 1609.34


def calculate_distance(geocode1, geocode2):
    r = config.EARTH_RADIUS
    phi1 = radians(geocode1[0])
    phi2 = radians(geocode2[0])
    delta_phi = radians(geocode2[0] - geocode1[0])
    delta_lambda = radians(geocode2[1] - geocode1[1])
    a = sin(delta_phi / 2) * sin(delta_phi / 2) + cos(phi1) * cos(phi2) * sin(delta_lambda / 2) * sin(delta_lambda / 2)
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return r * c


def calculate_haversine(origin_geocode, radius, angle):
    """
        Use Haversine formula to calculate distance between two points on a sphere. Since we're on earth.
        And it's round. Sorry Kyrie.
    """
    r = config.EARTH_RADIUS
    bearing = radians(angle)
    lat1 = radians(origin_geocode[0])
    lng1 = radians(origin_geocode[1])
    lat2 = asin(sin(lat1) * cos(radius / r) + cos(lat1) * sin(radius / r) * cos(bearing))
    lng2 = lng1 + atan2(sin(bearing) * sin(radius / r) * cos(lat1), cos(radius / r) - sin(lat1) * sin(lat2))
    lat2 = degrees(lat2)
    lng2 = degrees(lng2)
    return [lat2, lng2]


def parse_distance_json(url):
    """ Return addresses/durations given origin, destinations, and transit method """
    req = requests.get(url)
    results = req.json()
    addresses = [address for address in results['destination_addresses'] if address != '']
    i = 0
    durations = [0] * len(addresses)
    if len(results['destination_addresses']):
        for row in results['rows'][0]['elements']:
            if row['status'] == 'OK':
                if 'duration_in_traffic' in row:
                    durations[i] = row['duration_in_traffic']['value'] / 60
                else:
                    durations[i] = row['duration']['value'] / 60
                i += 1
    return [addresses, durations]


def get_geocode(address):
    """ Get geocode for given address using Google Maps Geocode API """
    prefix = 'https://maps.googleapis.com/maps/api/geocode/json'
    url = urlparse('%s?address=%s&key=%s' % (prefix, address, config.GOOGLE_API_KEY))
    full_url = '%s://%s%s?%s' % (url.scheme, url.netloc, url.path, url.query)
    req = requests.get(full_url)
    results = req.json()
    return [results['results'][0]['geometry']['location']['lat'], results['results'][0]['geometry']['location']['lng']]


def get_destination(origin, radius, angle):
    origin_geocode = get_geocode(origin)
    return calculate_haversine(origin_geocode=origin_geocode, radius=radius, angle=angle)


def get_speed(transit_method):
    if transit_method == 'driving':
        return config.AVERAGE_CAR_SPEED
    elif transit_method == 'transit':
        return config.AVERAGE_TRANSIT_SPEED
    elif transit_method == 'bicycling':
        return config.AVERAGE_BICYCLING_SPEED
    else:
        return config.AVERAGE_WALKING_SPEED


def build_url(origin, destination, transit_method):
    """ Build url for isochrone calculation """
    prefix = 'https://maps.googleapis.com/maps/api/distancematrix/json?'
    destination_str = str(destination).replace(' ', '')
    for element in destination:
        destination_str = '{0}|{1}'.format(destination_str, ','.join(map(str, element)))
    url = urlparse('%s&origins=%s&destinations=%s&mode=%s&departure_time=%s&traffic_model=%s&key=%s' %
                   (prefix, origin, destination_str, transit_method, 'now', 'pessimistic', config.GOOGLE_API_KEY))
    return '%s://%s%s?%s' % (url.scheme, url.netloc, url.path, url.query)


def calculate_isochrone(origin, transit_method, transit_time, max_speed=75, num_of_angles=6, tolerance=0.25):
    speed = get_speed(transit_method)
    duration = transit_time / speed

    rad1 = [duration] * num_of_angles
    phi1 = [i * (360 / num_of_angles) for i in range(num_of_angles)]
    data0 = [0] * num_of_angles
    rad0 = [0] * num_of_angles
    rmin = [0] * num_of_angles
    rmax = [(max_speed / 60) * transit_time] * num_of_angles
    iso = [[0, 0]] * num_of_angles

    j = 0

    while sum([a - b for a, b in zip(rad0, rad1)]) != 0:
        rad2 = [0] * num_of_angles
        for i in range(num_of_angles):
            iso[i] = get_destination(origin, rad1[i], phi1[i])
        full_url = build_url(origin=origin, destination=iso, transit_method=transit_method)
        data = parse_distance_json(full_url)
        if not len(data[0]) or not len(data[1]):
            raise GoogleMapsError
        for i in range(num_of_angles):
            if (data[1][i] < (transit_time - tolerance)) & (data0[i] != data[0][i]):
                rad2[i] = (rmax[i] + rad1[i]) / 2
                rmin[i] = rad1[i]
            elif (data[1][i] > (transit_time + tolerance)) & (data0[i] != data[0][i]):
                rad2[i] = (rmin[i] + rad1[i]) / 2
                rmax[i] = rad1[i]
            else:
                rad2[i] = rad1[i]
            data0[i] = data[0][i]
        rad0 = rad1
        rad1 = rad2
        j += 1
        print('attempt' + str(j))
        if j > 30:
            raise TakingTooLong
    return iso


def calculate_radius(origin, transit_method, transit_time):
    """ Calculate radius around address given transit method and time """
    origin = origin.replace(' ', '+')
    origin_geocode = get_geocode(origin)
    isochrone = calculate_isochrone(origin=origin, transit_method=transit_method.lower(), transit_time=float(transit_time))
    distances = [calculate_distance(origin_geocode, destination) for destination in isochrone]
    average_radius = sum(distances) / len(distances)
    return dict(radius=average_radius)
