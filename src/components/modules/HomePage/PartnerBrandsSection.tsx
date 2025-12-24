
import brand1 from "@/assets/images/brand1.png";
import brand2 from "@/assets/images/brand2.png";
import brand3 from "@/assets/images/brand3.png";
import brand4 from "@/assets/images/brand4.png";
import brand5 from "@/assets/images/brand5.png";
// import brand6 from "@/assets/images/brand6.png";
import brand7 from "@/assets/images/brand7.png";

const partners = [
    { src: brand1, alt: "Brand 1" },
    { src: brand2, alt: "Brand 2" },
    { src: brand4, alt: "Brand 4" },
    { src: brand5, alt: "Brand 5" },
    { src: brand7, alt: "Brand 7" },
    { src: brand3, alt: "Brand 3" }

];

export default function PartnerBrandsSection() {
    return (
        <section className="px-6 mt-10 md:mt-16 mb-10 md:mb-16">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
                        Our Partners
                    </h2>
                    <p className="">
                        We proudly collaborate with industry-leading brands, payment providers, and sponsors to deliver the best ride experience.
                    </p>
                </div>
                <div className="flex flex-wrap justify-center items-center gap-4">
                    {partners.map((brand) => (
                        <img
                            src={brand.src}
                            key={brand.alt}
                            alt={brand.alt}
                            className="h-10 max-w-[120px] object-cover  transition duration-300 rounded-xs"
                            loading="lazy"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
