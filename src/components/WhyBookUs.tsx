"use client";

export default function WhyBookUs() {
  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      className="relative py-12 px-4"
      style={{ backgroundColor: "rgba(0, 140, 149, 0.05)" }}
    >
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          maskImage: "url(/images/whyUs/bgdesign1_ynysgv.png)",
          WebkitMaskImage: "url(/images/whyUs/bgdesign1_ynysgv.png)",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          maskSize: "cover",
          WebkitMaskSize: "cover",
          backgroundColor: "rgba(0, 140, 149, 1)",
        }}
      ></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Left Section */}
        <div className="flex flex-col justify-between space-y-6 text-center md:text-left md:col-span-1">
          <div className="flex flex-col space-y-4 items-start text-left">
            <h2 className="text-[rgba(0,140,149,1)] text-4xl sm:text-5xl uppercase font-extrabold my-2">
              Why Book With Us?
            </h2>
            <button
              type="button"
              className="py-3 px-10 mt-4 font-light text-white rounded-full hover:opacity-80 transition duration-300 uppercase text-base cursor-pointer"
              style={{ backgroundColor: "rgba(255, 213, 90, 1)" }}
              onClick={scrollToContact}
            >
              Get a Consultation
            </button>
          </div>
          <div className="flex flex-col items-baseline space-y-4 text-left">
            <div className="flex">
              {/* Images of Travelers */}
              <img
                src="https://lh3.googleusercontent.com/a-/AD_cMMSq_F7G_S5u4jOgRbkiVDcJPIWbvKk7aLiLCN2ejAHT4No=s120-c-rp-mo-ba4-br100"
                alt="Traveler 1"
                className="border-2 border-lightest h-12 object-cover rounded-full w-12"
              />
              <img
                src="https://lh3.googleusercontent.com/a-/AD_cMMRQMRVlcf4XdzIABNNeWnpZv5SGcbJx4BDlRnQykomRyDo=s120-c-rp-mo-ba4-br100"
                alt="Traveler 2"
                className="border-2 border-lightest h-12 object-cover transform -translate-x-1/2 rounded-full w-12"
              />
              <img
                src="https://lh3.googleusercontent.com/a-/AD_cMMRFZ-o_A0ZiJcGSF9FIf2X1N5tR3zVXNTPAxmetm9TnOBQ=s120-c-rp-mo-br100"
                alt="Traveler 3"
                className="border-2 border-lightest h-12 object-cover transform -translate-x-full rounded-full w-12"
              />
            </div>
            <p
              className="text-sm text-opacity-80 font-medium"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
            >
              Join the{" "}
              <span
                className="font-bold"
                style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
              >
                78,000+
              </span>{" "}
              travelers who&apos;ve let us handle their dream trips!
            </p>
          </div>
        </div>
        {/* Right Section - Cards */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-start border border-gray-100 hover:border-primary/20 group">
            <div className="text-primary mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300">
              {/* Icon SVG for Card 1 */}
              <svg
                className="w-8 h-8"
                style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9 l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4 c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z"
                ></path>
              </svg>
            </div>
            <h3
              className="text-base sm:text-lg font-bold text-left uppercase mb-3"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
            >
              12+ Years of Expertise
            </h3>
            <p
              className="text-sm text-left leading-relaxed"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.8 }}
            >
              Trust your travel plans to a team with over a decade of experience
              in the industry.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-start border border-gray-100 hover:border-primary/20 group">
            <div className="text-primary mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300">
              {/* Icon SVG for Card 2 */}
              <svg
                className="w-8 h-8"
                fill="currentColor"
                style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <g>
                    <path d="M17.5,8C16.1,8,15,6.9,15,5.5V2c0-0.6-0.4-1-1-1H6C3.8,1,2,2.8,2,5v14c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9    c0-0.6-0.4-1-1-1H17.5z M14,17H8c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1C15,16.6,14.6,17,14,17z M16,13H8    c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1C17,12.6,16.6,13,16,13z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <h3
              className="text-base sm:text-lg font-bold text-left uppercase mb-3"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
            >
              Seamless visa services
            </h3>
            <p
              className="text-sm text-left leading-relaxed"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.8 }}
            >
              Enjoy hassle-free travel with our dedicated visa assistance.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-start border border-gray-100 hover:border-primary/20 group">
            <div className="text-primary mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300">
              {/* Icon SVG for Card 3 */}
              <svg
                className="w-8 h-8 fill-current"
                style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16.6,18.58c.11,0,.21-.01,.32-.02-.08-.6-.15-1.2-.15-1.82,0-5.1,3-9.48,7.32-11.52C22.55,2.69,19.78,1,16.6,1,11.75,1,7.81,4.94,7.81,9.79,7.81,14.64,11.75,18.58,16.6,18.58Z"></path>
                <circle cx="29.48" cy="16.74" r="9.76"></circle>
                <path d="M37.99,26.37c-2.27,2.01-5.25,3.24-8.52,3.24-3.26,0-6.22-1.22-8.49-3.21-5.91,3.23-9.95,9.7-9.95,17.17,0,1.18,.1,2.32,.3,3.44h36.37c.1-.9,.1-2.05,.1-3.44,0-7.49-4.06-14-9.99-17.17Z"></path>
                <path d="M19.16,24.2c-.63-.89-1.15-1.85-1.54-2.88-.34,.03-.68,.05-1.02,.05-2.93,0-5.6-1.1-7.64-2.89-6.36,4.93-9.99,10.76-9.99,17.5,0,1.06,.1,2.1,.27,3.1h9.06c.3-5.65,3.94-10.29,8.83-12.93Z"></path>
              </svg>
            </div>
            <h3
              className="text-base sm:text-lg font-bold text-left uppercase mb-3"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
            >
              Tailored packages for every traveler
            </h3>
            <p
              className="text-sm text-left leading-relaxed"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.8 }}
            >
              Discover tours designed to meet diverse interests.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-start border border-gray-100 hover:border-primary/20 group">
            <div className="text-primary mb-6 bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl group-hover:from-primary/5 group-hover:to-primary/10 transition-all duration-300">
              {/* Icon SVG for Card 4 */}
              <svg
                className="w-8 h-8 fill-current"
                style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2.0835,9.3027A4.1355,4.1355,0,0,1,6.1289,6H25.8711A4.1264,4.1264,0,0,1,29.93,9.4346L16.0044,14.9233ZM16.3667,16.93a.9989.9989,0,0,1-.7412-.003L2,11.4258V21.8711A4.1334,4.1334,0,0,0,6.1289,26H25.8711A4.1334,4.1334,0,0,0,30,21.8711V11.5562Z"></path>
              </svg>
            </div>
            <h3
              className="text-base sm:text-lg font-bold text-left uppercase mb-3"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.9 }}
            >
              24/7 customer support
            </h3>
            <p
              className="text-sm text-left leading-relaxed"
              style={{ color: "rgba(0,140,149,1)", opacity: 0.8 }}
            >
              Travel with peace of mind knowing our dedicated team is here for
              you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
