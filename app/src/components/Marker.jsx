import React from 'react';

export default function Marker(props) {
  const { lat, lng } = props;
  return (
    <div className={lat && lng ? "marker" : "marker hidden"}></div>
  );
}
