import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FeaturedNavigation from '@/components/FeaturedNavigation';
import FeaturedTours from '@/components/FeaturedTours';
import UmrahPackages from '@/components/UmrahPackages';
import WhyBookUs from '@/components/WhyBookUs';
import Reviews from '@/components/reviews';
import Faqs from '@/components/Faqs';
import VisaServices from '@/components/VisaServices';

export default function Home() {
  return (
    <div className="min-h-screen">
              <Header />
              <Hero />
              <FeaturedNavigation />
              <FeaturedTours />
              <UmrahPackages />
              <WhyBookUs />
      <VisaServices />
      <Reviews />
      <Faqs />

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-600 mb-4">Ready to start your journey? Contact us today!</p>
              <div className="space-y-2">
                <p className="text-gray-600">📧 info@greenappletravel.ae</p>
                <p className="text-gray-600">📞 +971 4 370 5995</p>
                <p className="text-gray-600">📍 Near Burjuman Metro, Dubai</p>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[rgba(0,118,111,1)]"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[rgba(0,118,111,1)]"
                />
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-[rgba(0,118,111,1)]"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-[rgba(0,118,111,1)] text-white py-3 rounded hover:bg-opacity-80 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
