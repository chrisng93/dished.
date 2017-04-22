import React, { Component, PropTypes as T } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds, meters2ScreenPixels } from 'google-map-react/utils';
import { milesToMeters } from '../utils/conversionUtils';
import Marker from './Marker';

const propTypes = {
  address: T.string,
  width: T.string,
  height: T.string,
  radius: T.number,
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.geocoder = typeof google === 'object' ? new google.maps.Geocoder() : null;
    this.state = {
      center: { lat: 0, lng: 0 },
      zoom: 12,
      error: '',
      radiusWidth: 0,
      radiusHeight: 0,
    };
    this.setCenter = this.setCenter.bind(this);
    this.setRadius = this.setRadius.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    this.setCenter(this.props.address);
    this.setRadius(this.props.radius);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address !== nextProps.address) {
      this.setCenter(nextProps.address);
    }
    if (this.props.radius !== nextProps.radius) {
      this.setRadius(nextProps.radius);
    }
  }

  setCenter(address) {
    const { width, height, radius } = this.props;
    if (!this.geocoder) {
      return;
    }
    this.geocoder.geocode({ address }, (results, status) => {
      if (status !== google.maps.GeocoderStatus.OK) {
        return this.setState({ error: status });
      }
      const geo = results[0].geometry.viewport;
      const bounds = {
        nw: {
          lat: geo.f.b,
          lng: geo.b.b,
        },
        se: {
          lat: geo.f.f,
          lng: geo.b.f,
        }
      };
      const size = { width, height };
      const { center, zoom } = fitBounds(bounds, size);
      this.setState({ center, zoom: zoom || this.state.zoom }, () => this.setRadius(radius));
      console.log('set state', center, zoom)
    });
  }

  onChange(changes) {
    this.setState({ zoom: changes.zoom }, () => this.setRadius(this.props.radius))
  }

  setRadius(radius) {
    const { center, zoom } = this.state;
    const { lat, lng } = center;
    const { w, h } = meters2ScreenPixels(milesToMeters(radius), { lat, lng }, zoom);
    this.setState({ radiusWidth: w, radiusHeight: h });
  }

  render() {
    const { center, zoom, radiusWidth, radiusHeight, error } = this.state;
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
        center={center}
        zoom={zoom}
        onChange={this.onChange}
      >
        <Marker type={'center'} lat={center.lat} lng={center.lng} zoom={zoom} />
        <Marker type={'radius'} lat={center.lat} lng={center.lng} width={radiusWidth} height={radiusHeight} />
      </GoogleMapReact>
    );
  }
}

Map.propTypes = propTypes;
