import Breadcrumb from "@/components/layouts/Breadcrumb";
import featureImg from "@/assets/images/features.webp";

export default function Features() {
  return (
    <section>
      <Breadcrumb
        title="Features"
        description="Discover the features that make our platform reliable and user-friendly."
        backgroundImage={featureImg}
      />
      <div className="text-center py-10">
        <h1>Features Page</h1>
      </div>
    </section>
  );
}
