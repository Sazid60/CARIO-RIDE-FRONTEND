import React from "react";
import { MapContainer, TileLayer, Circle, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const serviceAreas = [
    { city: "Dhaka", coords: [23.8103, 90.4125], radius: 12000 },
    { city: "Chattogram", coords: [22.3569, 91.7832], radius: 10000 },
    { city: "Sylhet", coords: [24.8949, 91.8687], radius: 8000 },
    { city: "Khulna", coords: [22.8456, 89.5403], radius: 8000 },
    { city: "Rajshahi", coords: [24.3745, 88.6042], radius: 8000 },
    { city: "Barisal", coords: [22.7010, 90.3535], radius: 7000 },
    { city: "Rangpur", coords: [25.7439, 89.2752], radius: 7000 },
    { city: "Mymensingh", coords: [24.7471, 90.4203], radius: 7000 },
    { city: "Comilla", coords: [23.4607, 91.1809], radius: 6000 },
    { city: "Narayanganj", coords: [23.6238, 90.5000], radius: 6000 },
    { city: "Gazipur", coords: [23.9999, 90.4203], radius: 6000 },
    { city: "Jessore", coords: [23.1667, 89.2089], radius: 6000 },
    { city: "Bogra", coords: [24.8465, 89.3776], radius: 6000 },
    { city: "Pabna", coords: [24.0064, 89.2372], radius: 6000 },
    { city: "Tangail", coords: [24.2513, 89.9167], radius: 6000 },
    { city: "Noakhali", coords: [22.8231, 91.0973], radius: 6000 },
    { city: "Dinajpur", coords: [25.6275, 88.6336], radius: 6000 },
    { city: "Faridpur", coords: [23.6070, 89.8429], radius: 6000 },
    { city: "Kushtia", coords: [23.9013, 89.1208], radius: 6000 },
    { city: "Jamalpur", coords: [24.9375, 89.9372], radius: 6000 },
];

const markerIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

export default function ServiceAreaMapSection() {
    return (
        <section className="px-6 mt-10 md:mt-16">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
                        Our Service Areas
                    </h2>
                    <p className="">
                        We currently operate in the following major cities. More locations coming soon!
                    </p>
                </div>
                <div className="z-10 w-full h-[350px] md:h-[450px] rounded-none overflow-hidden shadow-lg relative">
                    <MapContainer
                        center={[23.8103, 90.4125]}
                        zoom={7}
                        className="h-full w-full"
                        scrollWheelZoom={false}
                    >
                        <TileLayer
                            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                            attribution="&copy; <a href='https://carto.com/attributions'>CARTO</a>"
                        />
                        {serviceAreas.map((area) => (
                            <React.Fragment key={area.city + "-fragment"}>
                                <Circle
                                    center={area.coords as [number, number]}
                                    radius={area.radius}
                                    pathOptions={{ color: "#f97316", fillOpacity: 0.2 }}
                                />
                                <Marker
                                    position={area.coords as [number, number]}
                                    icon={markerIcon}
                                >
                                    <Popup>{area.city}</Popup>
                                </Marker>
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </section>
    );
}
