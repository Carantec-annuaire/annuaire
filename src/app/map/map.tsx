// src/app/map/MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import { useEffect, useState } from 'react';
import { geocodeAddress } from '../../utils/geacode';

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

interface MarkerData {
    address: string;
    latitude: number;
    longitude: number;
}

const MapComponent = () => {
    const [markers, setMarkers] = useState<MarkerData[]>([]);

    useEffect(() => {
        const fetchCoordinates = async () => {
            const addresses = ['Brest', 'Morlaix'];
            const promises = addresses.map(async (address) => {
                try {
                    const { latitude, longitude } = await geocodeAddress(address);
                    return { address, latitude, longitude };
                } catch (error) {
                    console.error(`Error fetching coordinates for ${address}:`, error);
                    return null;
                }
            });
            const results = await Promise.all(promises);
            setMarkers(results.filter((result): result is MarkerData => result !== null));
        };

        fetchCoordinates();
    }, []);

    const activityIcon = createCustomIcon("#831647", "#db2777");
    const structureIcon = createCustomIcon("#316A6D", "#99CED1");
    const partenaireIcon = createCustomIcon("#59632C", "#D6DEB5");

    return (
        <div className="h-96 w-full">
            <MapContainer center={[48.55, -3.85]} zoom={8} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={[marker.latitude, marker.longitude]}
                        icon={activityIcon}
                    >
                        <Popup>
                            {marker.address}
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
    );
};

export default MapComponent;
