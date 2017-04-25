import React, { Component, PropTypes as T } from 'react';

const propTypes = {
  type: T.string,
  lat: T.number,
  lng: T.number,
  width: T.number,
  height: T.number,
  zoom: T.number,
};

export default class Marker extends Component {
  constructor(props) {
    super(props);
    this.renderCenter = this.renderCenter.bind(this);
    this.renderRadius = this.renderRadius.bind(this);
    this.renderRestaurant = this.renderRestaurant.bind(this);
  }

  renderCenter() {
    const { lat, lng, zoom } = this.props;
    let width = 20;
    let height = 20;
    if (zoom < 12) {
      width = width / Math.pow(2, (12 - zoom));
      height = height / Math.pow(2, (12 - zoom));
    }
    return (
      <section
        className={lat && lng ? "marker center" : "hidden"}
        style={{ width: `${width}px`, height: `${height}px`, marginLeft: `-${width/2}px`, marginTop: `-${height/2}px` }}
      />
    );
  }

  renderRadius() {
    const { lat, lng, width, height } = this.props;
    return (
        <section
          className={lat && lng ? "marker radius" : "hidden"}
          style={{ width: `${width}px`, height: `${height}px`, marginLeft: `-${width/2}px`, marginTop: `-${height/2}px` }}
        />
    );
  }

  renderRestaurant() {
    const { zoom, selected } = this.props;
    let width = 10;
    let height = 10;
    if (zoom < 12) {
      width = width / Math.pow(2, (12 - zoom));
      height = height / Math.pow(2, (12 - zoom));
    }
    return (
      <section
        className={`marker restaurant ${selected ? 'selected' : ''}`}
        style={{ width: `${width}px`, height: `${height}px`, marginLeft: `-${width/2}px`, marginTop: `-${height/2}px` }}
      />
    )
  }

  render() {
    const { type } = this.props;
    return (
      <section>
        {type === 'center' ? this.renderCenter() : null}
        {type === 'radius' ? this.renderRadius() : null}
        {type === 'restaurant' ? this.renderRestaurant() : null}
      </section>
    );
  }
}

Marker.propTypes = propTypes;
