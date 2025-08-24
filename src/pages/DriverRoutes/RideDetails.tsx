/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { BounceLoader } from "react-spinners";
import { useSingleRideAcceptedByMeQuery, useUpdateRideLocationMutation } from "@/redux/features/rides/rides.api";
import RideTimeline from "@/components/RideTimeline";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useGetDriverProfileQuery, useUpdateDriverLocationMutation } from "@/redux/features/driver/driver.api";
import { Button } from "@/components/ui/button";


export default function RideDetails() {
    const { id } = useParams<{ id: string }>();

    const { data: rideData, isLoading: rideLoading } = useSingleRideAcceptedByMeQuery(id, {
        pollingInterval: 5000,
        refetchOnMountOrArgChange: true,
    });
    const ride = rideData?.data;

    const { data: driverData, isLoading: driverLoading } = useGetDriverProfileQuery(undefined, {
        pollingInterval: 5000,
        refetchOnMountOrArgChange: true,
    });
    const driver = driverData?.data;

    const [driverCoords, setDriverCoords] = useState<[number, number] | null>(null);
    const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
    const [pickupAddress, setPickupAddress] = useState("");
    const [destinationAddress, setDestinationAddress] = useState("");


    const [updateDriverLocation] = useUpdateDriverLocationMutation();
    const [updateRideLocation] = useUpdateRideLocationMutation();


    // Leaflet marker setup
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });

    const orangeMarker = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    const blueMarker = new L.Icon({
        iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
        shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });

    // Update driverCoords from backend
    useEffect(() => {
        if (driver?.currentLocation?.coordinates) {
            const [lon, lat] = driver.currentLocation.coordinates;
            setDriverCoords([lat, lon]);
        }
    }, [driver]);

    // Fetch route driver -> pickup -> destination
    useEffect(() => {
        const fetchRoute = async () => {
            if (driverCoords && ride?.pickupLocation && ride?.destination) {
                try {
                    const coords = [
                        [driverCoords[1], driverCoords[0]],
                        ride.pickupLocation.coordinates,
                        ride.destination.coordinates
                    ]
                        .map((c) => `${c[0]},${c[1]}`)
                        .join(";");

                    const res = await axios.get(
                        `https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson`
                    );

                    const route = res.data.routes[0].geometry.coordinates.map(
                        (c: [number, number]) => [c[1], c[0]]
                    );
                    setRouteCoords(route);
                } catch (err) {
                    console.error("Error fetching route:", err);
                }
            }
        };
        fetchRoute();
    }, [driverCoords, ride]);

    // Fetch pickup and destination addresses
    useEffect(() => {
        const fetchAddresses = async () => {
            if (ride?.pickupLocation && ride?.destination) {
                try {
                    const pickupRes = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.pickupLocation.coordinates[1]}&lon=${ride.pickupLocation.coordinates[0]}`
                    );
                    setPickupAddress(pickupRes.data.display_name);

                    const destRes = await axios.get(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.destination.coordinates[1]}&lon=${ride.destination.coordinates[0]}`
                    );
                    setDestinationAddress(destRes.data.display_name);
                } catch (err) {
                    console.error("Error fetching addresses:", err);
                }
            }
        };
        fetchAddresses();
    }, [ride]);

    useEffect(() => {
        if (["ACCEPTED", "PICKED_UP", "IN_TRANSIT"].includes(ride?.rideStatus)) {
            const watchId = navigator.geolocation.watchPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    const location = {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    };

                    try {
                        await updateDriverLocation(location).unwrap();
                        if (ride.rideStatus === "IN_TRANSIT") {
                            await updateRideLocation({ id: ride._id, location }).unwrap();
                        }
                        setDriverCoords([latitude, longitude]);
                    } catch (err) {
                        console.error("Error updating location:", err);
                    }
                },
                (error) => console.error("Error getting location:", error),
                { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
            );

            return () => navigator.geolocation.clearWatch(watchId);
        }
    }, [ride?.rideStatus, ride?._id, updateDriverLocation, updateRideLocation]);


    if (rideLoading || driverLoading || !driverCoords) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <BounceLoader color="#f97316" size={80} />
            </div>
        );
    }

    if (!ride) return <div className="min-h-screen flex justify-center items-center"><p>No ride data found.</p></div>;

    const pickupCoords: [number, number] = [
        ride.pickupLocation.coordinates[1],
        ride.pickupLocation.coordinates[0],
    ];
    const destinationCoords: [number, number] = [
        ride.destination.coordinates[1],
        ride.destination.coordinates[0],
    ];

    return (
        <section className="container mx-auto max-w-4xl mt-20 p-4">
            <div className="shadow-lg overflow-hidden flex flex-col gap-4">
                {/* Map Section */}
                <div className="z-10 min-w-[400px] h-[350px] relative">
                    <MapContainer center={driverCoords} zoom={14} className="h-full w-full">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; OpenStreetMap'
                        />
                        <Marker position={driverCoords} icon={blueMarker} />
                        <Marker position={pickupCoords} icon={orangeMarker} />
                        <Marker position={destinationCoords} icon={orangeMarker} />
                        {routeCoords.length > 0 && <Polyline positions={routeCoords} color="orange" weight={5} />}
                    </MapContainer>
                </div>

                {/* Ride Details */}
                <div className="w-full p-4 shadow-lg border flex flex-col md:flex-row justify-around">
                    <RideTimeline ride={ride} />
                    <div className="flex flex-col ">
                        <div className="mt-6 space-y-4">
                            <h1 className="uppercase font-bold underline mb-6">Ride Details</h1>
                            <p className="text-sm"><strong className="text-primary">Distance:</strong> {ride.travelDistance} km</p>
                            <p className="text-sm"><strong className="text-primary">Fare:</strong> {ride.fare} BDT</p>
                            <p className="text-sm"><strong className="text-primary">Pickup:</strong> {pickupAddress || `${pickupCoords[0]}, ${pickupCoords[1]}`}</p>
                            <p className="text-sm"><strong className="text-primary">Destination:</strong> {destinationAddress || `${destinationCoords[0]}, ${destinationCoords[1]}`}</p>
                        </div>

                        {/* Dynamic Status Button */}
                        <div className="mt-6">
                            {ride.rideStatus === "ACCEPTED" && (
                                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-none">
                                    Pickup Rider
                                </Button>
                            )}
                            {ride.rideStatus === "PICKED_UP" && (
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-none">
                                    Start Ride
                                </Button>
                            )}
                            {ride.rideStatus === "IN_TRANSIT" && (
                                <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-none">
                                    Mark as Arrived
                                </Button>
                            )}
                            {ride.rideStatus === "ARRIVED" && (
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white rounded-none">
                                    Complete Ride
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
