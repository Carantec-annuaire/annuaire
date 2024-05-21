'use client';
// src/app/map/page.tsx
import MapComponent from './map';

const MapPage = () => {
    return (
        <div className="p-4">
            <p className="text-1xl font-bold mb-4">Carte des structures, des partenaires et des activités</p>
            <MapComponent />
        </div>
    );
};

export default MapPage;
