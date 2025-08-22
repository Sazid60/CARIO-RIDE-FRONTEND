import Breadcrumb from "@/components/layouts/Breadcrumb";
import faqImg from "@/assets/images/faq.webp";

export default function FAQ() {
  return (
    <section>
      <Breadcrumb
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services."
        backgroundImage={faqImg}
      />
      <div className="text-center py-10">
        <h1>FAQ Page</h1>
      </div>
    </section>
  );
}
