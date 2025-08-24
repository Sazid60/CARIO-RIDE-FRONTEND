
import { BounceLoader } from "react-spinners";
import Breadcrumb from "@/components/layouts/Breadcrumb";
import drivingImg from "@/assets/images/ride.webp";
import GoOnline from "@/components/modules/Driver/GoOnline";
import { useGetDriverProfileQuery } from "@/redux/features/driver/driver.api";
import RidesNearMe from "@/components/modules/Driver/RidesNearMe";

export default function StartDriving() {
  const { data, isLoading } = useGetDriverProfileQuery(undefined,);
  const driver = data?.data;

  console.log(driver)

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <BounceLoader color="#f97316" size={80} />
      </div>
    );
  }

  return (
    <section className="min-h-screen">
      {/* Breadcrumb */}
      <Breadcrumb
        title="Start Driving"
        description="Manage your driving status and nearby rides."
        backgroundImage={drivingImg}
      />

      {/* Main Content */}
      <div className="flex items-center justify-center mt-12 w-full">
        <h1 className="text-3xl font-bold">
          {driver?.onlineStatus === "ONLINE" ? <RidesNearMe/> : <GoOnline/>}
        </h1>
      </div>
    </section>
  );
}
