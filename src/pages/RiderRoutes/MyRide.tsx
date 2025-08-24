/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router";
import { useDriverNearMeQuery, useGetMyRideQuery } from "@/redux/features/rides/rides.api";
import RideTimeline from "@/components/RideTimeline";
import { BounceLoader } from "react-spinners";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function MyRide() {
  const { rideId } = useParams<{ rideId: string }>();
  const { data: rideData, isLoading: rideLoading } = useGetMyRideQuery(rideId!, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
  });

  const { data: driversData } = useDriverNearMeQuery(undefined, {
    pollingInterval: 5000,
    refetchOnMountOrArgChange: true,
  });

  const ride = rideData?.data;
  const drivers = driversData?.data || [];
  const [routeCoords, setRouteCoords] = useState<[number, number][]>([]);
  const [pickupAddress, setPickupAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);

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

  // Fetch route coordinates
  useEffect(() => {
    const fetchRoute = async () => {
      if (ride?.pickupLocation && ride?.destination && ride?.currentLocation) {
        try {
          const coords = `${ride.currentLocation.coordinates[0]},${ride.currentLocation.coordinates[1]};${ride.destination.coordinates[0]},${ride.destination.coordinates[1]}`;
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
  }, [ride]);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (ride?.pickupLocation && ride?.destination && ride?.currentLocation) {
        try {
          const pickupRes = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${ride.currentLocation.coordinates[1]}&lon=${ride.currentLocation.coordinates[0]}`
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

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", { rating, feedback });
    // call your API to submit rating & feedback
  };

  if (rideLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  if (!ride) return <div className="min-h-screen flex justify-center items-center"><p>No ride data found.</p></div>;

  const locationCoords: [number, number] = [
    ride.currentLocation.coordinates[1],
    ride.currentLocation.coordinates[0],
  ];
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
          <MapContainer center={locationCoords} zoom={14} className="h-full w-full">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap'
            />
            <Marker position={locationCoords} icon={orangeMarker} />
            <Marker position={destinationCoords} icon={orangeMarker} />
            {drivers.map((driver: any, idx: number) => (
              <Marker
                key={idx}
                position={[
                  driver.currentLocation.coordinates[1],
                  driver.currentLocation.coordinates[0],
                ]}
                icon={blueMarker}
              />
            ))}
            {routeCoords.length > 0 && <Polyline positions={routeCoords} color="orange" weight={5} />}
          </MapContainer>
        </div>

        {/* Ride Details & Conditional Actions */}
        <div className="w-full p-4 shadow-lg border flex flex-col md:flex-row justify-around">
          <RideTimeline ride={ride} />
          <div className="flex flex-col">
            <div className="mt-6 space-y-4">
              <h1 className="uppercase font-bold underline mb-6">Ride Details</h1>
              <p className="text-sm"><strong className="text-primary">Distance:</strong> {ride.travelDistance} km</p>
              <p className="text-sm"><strong className="text-primary">Fare:</strong> {ride.fare} BDT</p>
              <p className="text-sm"><strong className="text-primary">Pickup:</strong> {pickupAddress || `${pickupCoords[0]}, ${pickupCoords[1]}`}</p>
              <p className="text-sm"><strong className="text-primary">Destination:</strong> {destinationAddress || `${destinationCoords[0]}, ${destinationCoords[1]}`}</p>
            </div>

            {/* ARRIVED: Payment Options */}
            {ride.rideStatus === "ARRIVED" && (
              <div className="mt-6 flex gap-4">
                <Button className="bg-green-500 hover:bg-green-600 text-white rounded-none">Pay Online</Button>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-none">Pay in Cash</Button>
              </div>
            )}

            {/* COMPLETED: Feedback & Rating */}
            {ride.rideStatus === "COMPLETED" && (
              <div className="mt-6 flex flex-col gap-2">
                <h2 className="font-bold">Rate & Feedback</h2>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  placeholder="Rating (1-5)"
                  className="border p-2 rounded"
                />
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="Write your feedback"
                  className="border p-2 rounded"
                />
                <Button onClick={handleFeedbackSubmit}>Submit Feedback</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
