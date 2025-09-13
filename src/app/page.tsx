import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedNavigation from '@/components/FeaturedNavigation';
import FeaturedTours from '@/components/FeaturedTours';
import UmrahPackages from '@/components/UmrahPackages';
import WhyBookUs from '@/components/WhyBookUs';
import Reviews from '@/components/Reviews';
import Faqs from '@/components/Faqs';
import VisaServices from '@/components/VisaServices';
import ContactUs from '@/components/ContactUs';
import Footer from '@/components/Footer';
import WhyChooseUs from '@/components/WhyChooseUs';
import Faq from '@/components/Faq';
import HeroSlider from '@/components/HeroSlider';

export default function Home() {
  return (
    <div>
      <Header />
      <HeroSlider />
      {/* <Hero /> */}
      <FeaturedNavigation />
      <VisaServices />
      <FeaturedTours />
      <UmrahPackages />
      {/* <WhyBookUs /> */}
      <WhyChooseUs />
      <Reviews />
      {/* <Faqs /> */}
      <Faq />
      <ContactUs />
      <Footer />
    </div>
  );
}
