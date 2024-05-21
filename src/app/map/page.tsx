"use client";

import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'

export default function MapPage() {
    const centerCoordinates = [48.15, -3.25];
    return (
        <>
            <div className="">🚧 Page [Carte] en cours de construction 🚧</div>
            <div className="">
                <MapContainer center={[48.15, -3.25]} zoom={10} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {/* <Marker position={[51.505, -0.09]}>
                        <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                        </Popup>
                    </Marker> */}
                </MapContainer>
            </div>
        </>
    );
}