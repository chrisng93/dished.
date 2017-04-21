import React, { Component, PropTypes as T } from 'react';
import GoogleMapReact from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';
import Marker from './Marker';

const propTypes = {
  address: T.string,
};

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.geocoder = typeof google === 'object' ? new google.maps.Geocoder() : null;
    this.state = {
      center: { lat: 0, lng: 0 },
      zoom: 15,
      error: '',
    };
    this.setCenter = this.setCenter.bind(this);
  }

  componentWillMount() {
    this.setCenter(this.props.address);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.address !== nextProps.address) {
      this.setCenter(nextProps.address);
    }
  }

  setCenter(address) {
    const { width, height } = this.props;
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
      this.setState({ center, zoom });
    });
  }

  render() {
    const { center, zoom, error } = this.state;
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY }}
        center={center}
        zoom={zoom}
      >
        <Marker lat={center.lat} lng={center.lng} />
      </GoogleMapReact>
    );
  }
}

Map.propTypes = propTypes;
