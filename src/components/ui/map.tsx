"use client";

import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface Map {
  latitude: number;
  longitude: number;
  popupMessage: string;
}

const Map = React.memo(({ latitude, longitude, popupMessage }: Map) => {
  return (
    <MapContainer
      center={{ lat: latitude, lng: longitude }}
      zoom={13}
      scrollWheelZoom={false}
      className="w-full h-full z-0 rounded-md"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={{ lat: latitude, lng: longitude }}>
        <Popup>{popupMessage}</Popup>
      </Marker>
    </MapContainer>
  );
});

Map.displayName = "Map";

export default Map;
