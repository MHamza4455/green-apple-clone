import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      
      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Visa Services</h3>
              <p className="text-gray-600">Professional visa assistance for countries worldwide</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Tour Packages</h3>
              <p className="text-gray-600">Curated travel experiences around the globe</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-4">Umrah Packages</h3>
              <p className="text-gray-600">Spiritual journeys to the holy cities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Packages Section */}
      <section id="tour-packages" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Tour Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Europe Tours</h3>
              <p className="text-gray-600 mb-4">Explore the beautiful cities of Europe</p>
              <button className="bg-[rgba(0,118,111,1)] text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Asia Tours</h3>
              <p className="text-gray-600 mb-4">Discover the wonders of Asia</p>
              <button className="bg-[rgba(0,118,111,1)] text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                Learn More
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Americas Tours</h3>
              <p className="text-gray-600 mb-4">Experience the Americas</p>
              <button className="bg-[rgba(0,118,111,1)] text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Umrah Packages Section */}
      <section id="umrah-packages" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Umrah Packages</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Economy Umrah</h3>
              <p className="text-gray-600 mb-4">Affordable spiritual journey packages</p>
              <button className="bg-[rgba(0,118,111,1)] text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                View Details
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Premium Umrah</h3>
              <p className="text-gray-600 mb-4">Luxury spiritual journey experiences</p>
              <button className="bg-[rgba(0,118,111,1)] text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Visa Services Section */}
      <section id="visa-services" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Visa Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold mb-2">Tourist Visa</h3>
              <p className="text-gray-600 text-sm">Short-term travel visas</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold mb-2">Business Visa</h3>
              <p className="text-gray-600 text-sm">Professional travel visas</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold mb-2">Student Visa</h3>
              <p className="text-gray-600 text-sm">Educational institution visas</p>
            </div>
            <div className="text-center p-4">
              <h3 className="text-lg font-semibold mb-2">Work Visa</h3>
              <p className="text-gray-600 text-sm">Employment authorization visas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Customer Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">"Excellent service! They made my visa process so smooth."</p>
              <p className="font-semibold">- Ahmed K.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">"Amazing tour packages and great customer support."</p>
              <p className="font-semibold">- Sarah M.</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-600 mb-4">"Highly recommended for Umrah packages."</p>
              <p className="font-semibold">- Fatima A.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">How long does visa processing take?</h3>
              <p className="text-gray-600">Processing times vary by country and visa type, typically 5-15 business days.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">What documents do I need for a visa?</h3>
              <p className="text-gray-600">Requirements vary by country, but generally include passport, photos, and application forms.</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Do you offer group tour discounts?</h3>
              <p className="text-gray-600">Yes, we offer special rates for groups of 6 or more travelers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
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
