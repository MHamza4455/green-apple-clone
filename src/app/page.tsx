import FeaturedNavigation from "@/components/FeaturedNavigation";
import FeaturedTours from "@/components/FeaturedTours";
import UmrahPackages from "@/components/UmrahPackages";
import Reviews from "@/components/Reviews";
import Marquee from "@/components/marquee";
import VisaServices from "@/components/VisaServices";
import ContactUs from "@/components/ContactUs";
import WhyChooseUs from "@/components/WhyChooseUs";
import Faq from "@/components/Faq";
import HeroSlider from "@/components/HeroSlider";

export default function Home() {
  return (
    <div>
      <HeroSlider />
      <FeaturedNavigation />
      <Marquee />
      <VisaServices />
      <FeaturedTours />
      <UmrahPackages />
      {/* <WhyBookUs /> */}
      <WhyChooseUs />
      <Reviews />
      {/* <Faqs /> */}
      <Faq />
      <ContactUs />
    </div>
  );
}
