"use client";

import L, { LatLng, LeafletMouseEvent, Marker as LeafletMarker } from "leaflet";
import * as React from "react";
import { Marker, Popup } from "react-leaflet";

//escape bamboozled
interface IDraggableMarker {
  lat: number;
  lng: number;
  setLongitude: React.Dispatch<React.SetStateAction<number>>;
  setLatitude: React.Dispatch<React.SetStateAction<number>>;
}

export default function DraggableMarker({
  lat,
  lng,
  setLatitude,
  setLongitude,
}: IDraggableMarker) {
  const coordinates = {
    lat,
    lng,
  };

  const markerRef = React.useRef<LeafletMarker<LatLng> | null>(null);
  const markerHandler = React.useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker) {
          const { lat, lng } = marker.getLatLng();
          setLatitude(lat);
          setLongitude(lng);
        }
      },
    }),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <Marker
      draggable={true}
      eventHandlers={markerHandler}
      position={coordinates}
      ref={markerRef}
    >
      <Popup minWidth={90}>
        <span>
          <p>Hello everynyan!</p>
        </span>
      </Popup>
    </Marker>
  );
}
