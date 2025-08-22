import CallToAction from "@/components/modules/HomePage/CallToAction";
import CustomerFeedbackMarquee from "@/components/modules/HomePage/CustomerFeedback";
import HeroSection from "@/components/modules/HomePage/HeroSection";
import HowItWorks from "@/components/modules/HomePage/HowItWorks";
import ServiceHighlights from "@/components/modules/HomePage/ServiceHighlights";


export  function HomePage() {
  return (
    <div>
        <HeroSection/> 
        <ServiceHighlights/>
        <CustomerFeedbackMarquee/>
        <HowItWorks/>
        <CallToAction/>
    </div>
  )
}
