"use client"

import { useState } from "react"
import Breadcrumb from "@/components/layouts/Breadcrumb"
import faqImg from "@/assets/images/faq.webp"
import ask from "@/assets/images/features.webp"
import faqIllustration from "@/assets/images/faq.webp"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"

interface FaqItem {
  id: string
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  { id: "faq-1", question: "How do I create an account?", answer: "Just click on the signup button, enter your details, and you're good to go!" },
  { id: "faq-2", question: "Can I change my pickup location?", answer: "Yes, you can update your pickup location anytime before confirming the ride." },
  { id: "faq-3", question: "Are rides refundable?", answer: "Refunds are provided only under specific conditions, such as driver cancellation." },
  { id: "faq-4", question: "How do I contact support?", answer: "You can contact support via the in-app chat or email us at support@cario-ride.com." },
  { id: "faq-5", question: "Can I ride with pets?", answer: "Yes, pets are allowed in rides, but please inform the driver beforehand." },
  { id: "faq-6", question: "Is there a loyalty program?", answer: "Yes! Our loyalty program rewards frequent riders with discounts and special offers." },
]

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id || null)
  const [searchTerm, setSearchTerm] = useState("")

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  const filteredFaqs = faqItems.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <section>
      <Breadcrumb
        title="Frequently Asked Questions"
        description="Find answers to common questions about our services."
        backgroundImage={faqImg}
      />

      <div className="max-w-7xl mx-auto py-5 md:py-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="relative w-full xl:w-[90%] h-full">
          <img
            src={faqIllustration}
            alt="FAQ Illustration"
            className="w-full h-full object-cover shadow-md"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-white text-sm md:text-lg font-bold text-center px-4">
              Have Questions? We’ve Got Answers!
            </h2>
          </div>
        </div>

        {/* Right Side FAQ */}
        <div>
          <div className="mb-8 text-center lg:text-left">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item) => (
                <div key={item.id} className="border">
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="flex items-center w-full px-4 py-3 text-left font-medium text-sm md:text-md focus:outline-none"
                  >
                    <span className="mr-3 text-lg text-primary">{openId === item.id ? "●" : "○"}</span>
                    {item.question}
                  </button>
                  {openId === item.id && (
                    <div className="px-6 py-4 border-t text-sm md:text-md">
                      {item.answer}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center">No matching questions found.</p>
            )}
          </div>
        </div>
      </div>

      <div
        className="relative py-12 px-6  text-center  overflow-hidden"
        style={{
          backgroundImage: `url(${ask})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>

        <div className="relative z-10 text-white container mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase mb-4">
                  Ask a Question
          </h2>
          <p className="text-sm md:text-base mb-5 max-w-5xl mx-auto">
            Can't find what you're looking for? Ask us anything about our rides, pricing, or services and our team will respond promptly.
          </p>
          <Link to="/contact">
            <Button className="w-auto px-6 py-3 bg-primary rounded-none text-sm sm:text-base font-bold transition-transform duration-300 ease-in-out hover:scale-105">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
