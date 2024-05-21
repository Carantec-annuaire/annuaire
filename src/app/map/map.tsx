// src/app/map/MapComponent.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// Suppression des options de l'icône par défaut de Leaflet pour résoudre les problèmes de type
delete L.Icon.Default.prototype.options.iconUrl;
delete L.Icon.Default.prototype.options.iconRetinaUrl;
delete L.Icon.Default.prototype.options.shadowUrl;
L.Icon.Default.mergeOptions({
    iconUrl: '/images/marker-icon.png',
    iconRetinaUrl: '/images/marker-icon-2x.png',
    shadowUrl: '/images/marker-shadow.png',
});

const MapComponent = () => {
    useEffect(() => {
        // Effets secondaires à exécuter une fois au montage
    }, []);

    return (
        <div className="h-96 w-full">
            <MapContainer center={[48.55, -3.85]} zoom={8} className="h-full w-full">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[48.3904, -4.4861]}>
                    <Popup>
                        Brest
                    </Popup>
                </Marker>
                <Marker position={[48.5783, -3.8349]}>
                    <Popup>
                        Morlaix
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default MapComponent;
