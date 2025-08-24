'use client';

export default function ContactUs() {
  return (
    <section id="contact" className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300766f' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: 'rgba(0, 87, 82, 1)' }}>
            Get In Touch
          </h2>
          <div className="h-1 w-32 mx-auto mt-6 rounded" style={{ backgroundColor: 'rgba(127,171,168,1)' }}></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Disclaimer */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'rgba(0, 87, 82, 1)' }}>
                Disclaimer
              </h3>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl border border-gray-200">
                <p className="text-gray-700 leading-relaxed text-sm">
                  All visas are issued at the sole discretion of their respective Governments, and we can not guarantee any visa issuance. We do not have any affiliation with any government agency. All visas can be applied personally by using their respective Government websites or by visiting their Embassy or Consulate for which you will not be charged for service fee.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold mb-6" style={{ color: 'rgba(0, 87, 82, 1)' }}>
                Send us a Message
              </h3>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(0,118,111,0.3)] focus:border-[rgba(0,118,111,1)] transition-all duration-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(0,118,111,0.3)] focus:border-[rgba(0,118,111,1)] transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(0,118,111,0.3)] focus:border-[rgba(0,118,111,1)] transition-all duration-300"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Interest</label>
                    <select className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(0,118,111,0.3)] focus:border-[rgba(0,118,111,1)] transition-all duration-300">
                      <option value="">Select a service</option>
                      <option value="e-sim">E-Sim</option>
                      <option value="documentation">Documentation</option>
                      <option value="dubai-activities">Dubai Activities</option>
                      <option value="russia-embassies">Russia Embassies</option>
                      <option value="schengen">Schengen</option>
                      <option value="updates">Updates</option>
                      <option value="visa-services">Visa Services</option>
                      <option value="tour-packages">Tour Packages</option>
                      <option value="umrah">Umrah Packages</option>
                      <option value="flights">Flight Booking</option>
                      <option value="hotels">Hotel Booking</option>
                      <option value="other">Other Services</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    required
                    rows={5}
                    className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[rgba(0,118,111,0.3)] focus:border-[rgba(0,118,111,1)] transition-all duration-300 resize-none"
                    placeholder="Tell us about your travel plans or questions..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[rgba(202,162,110,1)] hover:bg-[rgba(202,162,110,0.8)] text-white py-4 px-8 rounded-xl font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 transform"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

