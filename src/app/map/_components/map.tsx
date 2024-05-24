"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Icon } from "leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";

const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

interface MapComponentProps {
  partenaires: any[];
  structures: any[];
  activities: any[];
}

type MarkerData = {
  objet: any;
  latitude: number;
  longitude: number;
};

// Function to convert the React component to SVG HTML string
const createCustomIcon = (color: string, fill: string) => {
  const iconMarkup = renderToStaticMarkup(
    <MapPin size={24} color={color} fill={fill} strokeWidth={2} />,
  );
  const iconUrl = `data:image/svg+xml,${encodeURIComponent(iconMarkup)}`;

  return new Icon({
    iconUrl,
    iconSize: [24, 24], // Icon size
    iconAnchor: [12, 24], // Point of the icon corresponding to the marker's position
    popupAnchor: [0, -24], // Point from which the popup should open relative to the iconAnchor
  });
};

export default function MapComponent({
  partenaires,
  structures,
  activities,
}: MapComponentProps) {
  console.log(partenaires.lat && partenaires.lng);
  console.log(structures);
  console.log(activities);

  const [markersPartenaires, setMarkersPartenaires] = useState<MarkerData[]>(
    [],
  );
  const [markersStructures, setMarkersStructures] = useState<MarkerData[]>([]);
  const [markersActivities, setMarkersActivities] = useState<MarkerData[]>([]);

  useEffect(() => {
    const filterMarkers = (items: any[]): MarkerData[] => {
      return items
        .filter((item) => item.latitude && item.longitude)
        .map((item) => ({
          objet: item,
          latitude: item.latitude,
          longitude: item.longitude,
        }));
    };

    setMarkersPartenaires(filterMarkers(partenaires));
    setMarkersStructures(filterMarkers(structures));
    setMarkersActivities(filterMarkers(activities));
  }, [partenaires, structures, activities]);

  const activityIcon = createCustomIcon("#831647", "#db2777");
  const structureIcon = createCustomIcon("#316A6D", "#99CED1");
  const partenaireIcon = createCustomIcon("#59632C", "#D6DEB5");

  return (
    <>
      <button
        onClick={() => {
          console.log(markersPartenaires);
          console.log(markersStructures);
          console.log(markersActivities);
        }}
      >
        BOUTTTON
      </button>

      <div className="h-96 w-full">
        <MapContainer
          center={[48.55, -3.85]}
          zoom={8}
          className="h-full w-full"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {markersPartenaires.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.latitude, marker.longitude]}
              icon={partenaireIcon}
            >
              <Popup>{marker.objet.nom}</Popup>
            </Marker>
          ))}
          {markersStructures.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.latitude, marker.longitude]}
              icon={structureIcon}
            >
              <Popup>{marker.objet.nom}</Popup>
            </Marker>
          ))}
          {markersActivities.map((marker, index) => (
            <Marker
              key={index}
              position={[marker.latitude, marker.longitude]}
              icon={activityIcon}
            >
              <Popup>{marker.objet.nom}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </>
  );
}
