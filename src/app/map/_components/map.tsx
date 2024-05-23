"use client"

import React, { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { geocodeAddress } from "~/utils/geacode";

interface MapComponentProps {
    partenaires: any;
    structures: any;
    activities: any;
}

type Marker = {
    objet: any;
    latitude: number;
    longitude: number;
}
// Fonction pour convertir le composant React en SVG HTML string
const createCustomIcon = (color: string, fill: string) => {
    const iconMarkup = renderToStaticMarkup(<MapPin size={24} color={color} fill={fill} strokeWidth={2} />);
    const iconUrl = `data:image/svg+xml,${encodeURIComponent(iconMarkup)}`;

    return new Icon({
        iconUrl,
        iconSize: [24, 24], // Taille de l'icône
        iconAnchor: [12, 24], // Point de l'icône correspondant à la position du marqueur
        popupAnchor: [0, -24], // Point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
    });
};

export default function MapComponent({ partenaires, structures, activities }) {

    const [markersPartenaire, setMarkersPartenaires] = useState<Marker[]>();
    const [markersStructures, setMarkersStructures] = useState<Marker[]>();
    const [markersActivities, setMarkersActivities] = useState<Marker[]>();
    const partenairesNotNulleable = partenaires.filter((partenaire: any): partenaire is string => partenaire.adresse != null)
    const structuresNotNulleable = structures.filter((structure: any): structure is string => structure.adresse != null)
    const activitiesNotNulleable = activities.filter((activitie: any): activitie is string => activitie.adresse != null)


    useEffect(() => {
        const fetchCoordinates = async (addresses: any, origin: string) => {
            const promises = addresses.map(async (address: any) => {
                try {
                    const { latitude, longitude } = await geocodeAddress(address);
                    return { address, latitude, longitude };
                } catch (error) {

                    return null;
                }
            });
            const results = await Promise.all(promises);
            switch (origin) {
                case "partenaire":
                    setMarkersPartenaires(results.filter((result): result is Marker => result !== null));
                    break;

                case "structures":
                    setMarkersStructures(results.filter((result): result is Marker => result !== null));
                    break;

                case "activities":
                    setMarkersActivities(results.filter((result): result is Marker => result !== null));
                    break;

                default:
                    break;
            }
        };
        fetchCoordinates(partenairesNotNulleable, "partenaire");
        fetchCoordinates(structuresNotNulleable, "structures");
        fetchCoordinates(activitiesNotNulleable, "activities");
    }, []);

    const activityIcon = createCustomIcon("#831647", "#db2777");
    const structureIcon = createCustomIcon("#316A6D", "#99CED1");
    const partenaireIcon = createCustomIcon("#59632C", "#D6DEB5");

    return (
        <>
            <button
                onClick={() => {
                    console.log(markersPartenaire);
                    console.log(markersStructures);
                    console.log(markersActivities);
                }}
            >BOUTTTON</button>

            <div className="h-96 w-full">
                <MapContainer center={[48.55, -3.85]} zoom={8} className="h-full w-full">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    {markersPartenaire.map((marker, index) => (
                        <Marker
                            key={index}
                            position={[marker.latitude, marker.longitude]}
                            icon={partenaireIcon}
                        >
                            <Popup>
                                {marker.objet}
                            </Popup>
                        </Marker>
                    ))}
                    {markersStructures.map((marker, index) => (
                        <Marker
                            key={index}
                            position={[marker.latitude, marker.longitude]}
                            icon={structureIcon}
                        >
                            <Popup>
                                {marker.objet}
                            </Popup>
                        </Marker>
                    ))}
                    {markersActivities.map((marker, index) => (
                        <Marker
                            key={index}
                            position={[marker.latitude, marker.longitude]}
                            icon={activityIcon}
                        >
                            <Popup>
                                {marker.objet}
                            </Popup>
                        </Marker>
                    ))}
                    {/* <Marker position={[48.55, -3.85]} icon={partenaireIcon} >
                        <Popup>
                            Quimper
                        </Popup>
                    </Marker>
                    <Marker position={[48.3904, -4.4861]} icon={structureIcon} >
                        <Popup>
                            Brest
                        </Popup>
                    </Marker>
                    <Marker position={[48.5783, -3.8349]} icon={structureIcon}>
                        <Popup>
                            Morlaix
                        </Popup>
                    </Marker> */}
                </MapContainer>
            </div>
        </>
    );
};













// src/app/map/MapComponent.tsx
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import { MapPin } from 'lucide-react';
// import { renderToStaticMarkup } from 'react-dom/server';

// import { geocodeAddress } from '~/utils/geacode';

// import { useEffect, useState } from 'react';

// // const addresses = [
// //     '8 Rue de la Paix, 75002 Paris',
// //     '15 Avenue des Champs-Élysées, 75008 Paris',
// //     '23 Boulevard Saint-Michel, 75005 Paris',
// //     '42 Rue de la République, 69002 Lyon',
// //     '17 Rue du Faubourg Saint-Honoré, 75008 Paris',
// //     '29 Avenue Jean Médecin, 06000 Nice',
// //     '10 Place Bellecour, 69002 Lyon',
// //     '5 Rue Sainte-Catherine, 33000 Bordeaux',
// //     '12 Rue de la République, 13002 Marseille',
// //     '20 Rue du Faubourg Saint-Martin, 75010 Paris',
// //     '25 Cours Mirabeau, 13100 Aix-en-Provence',
// //     '30 Rue de Strasbourg, 67000 Strasbourg',
// // ];

// // type Coordonnees = {
// //     latitude: number;
// //     longitude: number;
// //     id: string;
// // };

// // export default function Home() {
// //     const [coordinates, setCoordinates] = useState<Coordonnees[]>([]);

// //     useEffect(() => {
// //         const fetchCoordinates = async () => {
// //             const results: Coordonnees[] = [];
// //             for (const address of addresses) {
// //                 try {
// //                     const { latitude, longitude } = await geocodeAddress(address);
// //                     results.push({ latitude, longitude, id: address });
// //                 } catch (error) {
// //                     console.error('Failed to fetch coordinates for', address, error);
// //                 }
// //             }
// //             setCoordinates(results);
// //         };

// //         fetchCoordinates();
// //     }, []);

// //     return (
// //         <div>
// //             <h1>Coordinates</h1>
// //             <button
// //                 onClick={() => {
// //                     console.log(coordinates);
// //                 }}
// //             >BOUTTTON</button>
// //             <ul>
// //                 {coordinates.map((coord, index) => (
// //                     <li key={index}>
// //                         {coord.id}: ({coord.latitude}, {coord.longitude})
// //                     </li>
// //                 ))}
// //             </ul>
// //         </div>
// //     );
// // }


// // Fonction pour convertir le composant React en SVG HTML string
// const createCustomIcon = (color: string, fill: string) => {
//     const iconMarkup = renderToStaticMarkup(<MapPin size={24} color={color} fill={fill} strokeWidth={2} />);
//     const iconUrl = `data:image/svg+xml,${encodeURIComponent(iconMarkup)}`;

//     return new Icon({
//         iconUrl,
//         iconSize: [24, 24], // Taille de l'icône
//         iconAnchor: [12, 24], // Point de l'icône correspondant à la position du marqueur
//         popupAnchor: [0, -24], // Point depuis lequel la popup doit s'ouvrir relativement à l'iconAnchor
//     });
// };

// interface MarkerData {
//     address: string;
//     latitude: number;
//     longitude: number;
// };

// const MapComponent = ({ addresses }: any) => {
//     const [markers, setMarkers] = useState<MarkerData[]>([]);


//     useEffect(() => {
//         const fetchCoordinates = async () => {

//             const filtred = addresses.filter((address: any): address is string => address !== null)
//             const promises = filtred.map(async (address: any) => {
//                 try {
//                     const { latitude, longitude } = await geocodeAddress(address);
//                     return { address, latitude, longitude };
//                 } catch (error) {
//                     try {
//                         console.log(address.substring(address.indexOf(",") + 2));
//                         const commune = address.substring(address.indexOf(",") + 2);
//                         const { latitude, longitude } = await geocodeAddress(commune);
//                         return { address, latitude, longitude };
//                     } catch (error) {
//                         console.error(`Error fetching coordinates for ${address}:`, error);
//                         console.log(address.substring(address.indexOf(",") + 2));
//                         return null;
//                     }
//                 }
//             });
//             const results = await Promise.all(promises);
//             setMarkers(results.filter((result): result is MarkerData => result !== null));
//         };
//         fetchCoordinates();
//     }, []);



//     const activityIcon = createCustomIcon("#831647", "#db2777");
//     const structureIcon = createCustomIcon("#316A6D", "#99CED1");
//     const partenaireIcon = createCustomIcon("#59632C", "#D6DEB5");

//     return (
//         <>
//             <button
//                 onClick={() => {
//                     console.log(markers);
//                     console.log(markers.length);
//                 }}
//             >BOUTTTON</button>

//             <div className="h-96 w-full">
//                 <MapContainer center={[48.55, -3.85]} zoom={8} className="h-full w-full">
//                     <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />

//                     {markers.map((marker, index) => (
//                         <Marker
//                             key={index}
//                             position={[marker.latitude, marker.longitude]}
//                             icon={activityIcon}
//                         >
//                             <Popup>
//                                 {marker.address}
//                             </Popup>
//                         </Marker>
//                     ))}
//                     <Marker position={[48.55, -3.85]} icon={partenaireIcon} >
//                         <Popup>
//                             Quimper
//                         </Popup>
//                     </Marker>
//                     <Marker position={[48.3904, -4.4861]} icon={structureIcon} >
//                         <Popup>
//                             Brest
//                         </Popup>
//                     </Marker>
//                     <Marker position={[48.5783, -3.8349]} icon={structureIcon}>
//                         <Popup>
//                             Morlaix
//                         </Popup>
//                     </Marker>
//                 </MapContainer>
//             </div>
//         </>
//     );
// };

// export default MapComponent;
