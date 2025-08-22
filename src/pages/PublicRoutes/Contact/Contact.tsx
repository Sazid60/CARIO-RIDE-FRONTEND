import Breadcrumb from "@/components/layouts/Breadcrumb";
import contactImg from "@/assets/images/contact.webp";

export default function Contact() {
  return (
    <section>
      <Breadcrumb
        title="Contact Us"
        description="Get in touch with our support team for any inquiries."
        backgroundImage={contactImg}
      />
      <div className="text-center py-10">
        <h1>Contact Page</h1>
      </div>
    </section>
  );
}
