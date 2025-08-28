'use client';

import ImageSlider from './ImageSlider';
import HeroOverlay from './HeroOverlay';

export default function Hero() {
  const slides = [
    {
      id: 1,
      image: '/images/hero/heroOne.jpg',
      alt: 'Hero Placeholder Slide 1'
    },
    {
      id: 2,
      image: '/images/hero/heroTwo.jpg',
      alt: 'Hero Placeholder Slide 2'
    },
    {
      id: 3,
      image: '/images/hero/heroThree.jpg',
      alt: 'Hero Placeholder Slide 3'
    },
    {
      id: 4,
      image: '/images/hero/heroFour.jpg',
      alt: 'Hero Placeholder Slide 4'
    }
  ];

  const companyIcon = (
    <svg className="w-6 h-6 fill-current" viewBox="0 0 512 512">
      <path d="M38,130.3v23.8c10.9,0,19.7,8.8,19.7,19.7c0,10.9-8.8,19.7-19.7,19.7v15.5c10.9,0,19.7,8.8,19.7,19.7  c0,10.9-8.8,19.7-19.7,19.7v15.5c10.9,0,19.7,8.8,19.7,19.7s-8.8,19.7-19.7,19.7v15.5c10.9,0,19.7,8.8,19.7,19.7  s-8.8,19.7-19.7,19.7v23.8h436V130.3H38z M182,344h-74.3c-3.9,0-7-3.1-7-7s3.1-7,7-7H182c3.9,0,7,3.1,7,7S185.9,344,182,344z   M182,290h-74.3c-3.9,0-7-3.1-7-7s3.1-7,7-7H182c3.9,0,7,3.1,7,7S185.9,290,182,290z M237,354  c0,3.9-3.1,7-7,7s-7-3.1-7-7v-33.9c0-3.9,3.1-7,7-7s7,3.1,7,7V354z M237,300c0,3.9-3.1,7-7,7s-7-3.1-7-7v-33.9c0-3.9,3.1-7,7-7  s7,3.1,7,7V300z M237,245.9c0,3.9-3.1,7-7,7s-7-3.1-7-7V212c0-3.9,3.1-7,7-7s7,3.1,7,7V245.9z M237,191.9c0,3.9-3.1,7-7,7  s-7-3.1-7-7V158c0-3.9,3.1-7,7-7s7,3.1,7,7V191.9z M436.1,187.7l-1.9,20c-0.4,3.9-2.3,7.6-5.4,10.1l-20.1,16.6l27,69.3l-14.2,14.2  L370,266.4l-25.8,21.3l13.1,45.9l-7.1,7.1l-33.5-33.5c-4.4,0.5-9-0.9-12.3-4.3c-3.4-3.3-4.8-7.9-4.3-12.3l-33.5-33.5l7.1-7.1  l45.9,13.1l21.3-25.8l-51.5-51.5l14.2-14.2l69.3,27l16.6-20c2.5-3.1,6.2-5,10.1-5.3l20-1.9C429.1,170.5,436.9,178.3,436.1,187.7z"></path>
    </svg>
  );

  const actionButtons = [
    // First Row
    {
      href: "https://wa.me/97142846712?text=Hi%2C%20I%20was%20in%20your%20website.%20I'd%20like%20to%20enquire%20about%20%20Visa%20Services.%20Thanks",
      icon: (
        <svg className="h-4 w-4 sm:h-6 sm:w-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path fill="#005752" d="M16.004,31c-2.868,0-5.646-0.811-8.05-2.347l-5.348,1.709c-0.179,0.057-0.376,0.009-0.509-0.125c-0.132-0.134-0.178-0.332-0.117-0.51l1.725-5.146C1.935,22.061,1,19.1,1,16c0-4.076,1.612-7.891,4.539-10.742C5.736,5.066,6.053,5.07,6.246,5.267c0.192,0.198,0.188,0.515-0.01,0.707C3.505,8.636,2,12.196,2,16c0,2.974,0.922,5.811,2.665,8.204c0.095,0.131,0.121,0.3,0.069,0.454l-1.492,4.452l4.633-1.481c0.144-0.047,0.302-0.024,0.429,0.059C10.589,29.2,13.252,30,16.004,30C23.722,30,30,23.72,30,16c0-7.719-6.278-14-13.996-14c-2.167,0-4.238,0.481-6.164,1.429C9.589,3.55,9.29,3.449,9.168,3.202S9.147,2.654,9.396,2.532C11.46,1.516,13.682,1,15.996,1C24.272,1,31,7.729,31,16S24.272,31,16.004,31z"></path>
          <path fill="#005752" d="M20.602,24.493c-1.011,0-2.422-0.39-4.439-1.226c-2.633-1.09-5.243-3.374-7.35-6.429c-0.696-0.951-1.823-2.773-1.823-4.675c0-2.229,1.115-3.36,1.592-3.843c0.449-0.461,1.12-0.706,1.874-0.706c0.19,0,0.36,0.009,0.515,0.018c0.635,0.025,1.003,0.185,1.353,1.022l0.363,0.88c0.384,0.931,0.857,2.08,0.931,2.235c0.082,0.169,0.331,0.688,0.054,1.228c-0.148,0.316-0.293,0.483-0.492,0.713c-0.14,0.161-0.233,0.261-0.328,0.361c-0.11,0.118-0.222,0.234-0.334,0.375c-0.193,0.226-0.193,0.226-0.128,0.339c0.37,0.625,1.157,1.825,2.253,2.8c1.422,1.265,2.571,1.73,3.123,1.954l0.137,0.056c0.145,0.06,0.328,0.103,0.465-0.042c0.248-0.267,0.562-0.706,0.894-1.171l0.199-0.279c0.349-0.493,0.779-0.597,1.078-0.597c0.175,0,0.357,0.035,0.543,0.105c0.465,0.162,2.912,1.381,2.937,1.393l0.235,0.115c0.35,0.168,0.626,0.301,0.784,0.579c0.229,0.398,0.139,1.442-0.209,2.427c-0.417,1.179-1.967,2.1-3.213,2.368C21.293,24.438,20.998,24.493,20.602,24.493z"></path>
        </svg>
      ),
      text: "WhatsApp",
      ariaLabel: "Chat with our main office about visa services on WhatsApp",
      title: "WhatsApp main office",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "rounded-tl-md"
    },
    {
      href: "tel:+97143705995",
      icon: (
        <svg viewBox="0 0 256 256" className="h-4 w-4 sm:h-6 sm:w-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M159.4,40A80.1,80.1,0,0,1,216,96.6" fill="none" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
          <path d="M151.1,70.9a47.9,47.9,0,0,1,34,34" fill="none" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
          <path d="M92.5,124.8a83.6,83.6,0,0,0,39,38.9,8,8,0,0,0,7.9-.6l25-16.7a7.9,7.9,0,0,1,7.6-.7l46.8,20.1a7.9,7.9,0,0,1,4.8,8.3A48,48,0,0,1,176,216,136,136,0,0,1,40,80,48,48,0,0,1,81.9,32.4a7.9,7.9,0,0,1,8.3,4.8l20.1,46.9a8,8,0,0,1-.6,7.5L93,117A8,8,0,0,0,92.5,124.8Z" fill="none" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
        </svg>
      ),
      text: "Call",
      ariaLabel: "Call our main office",
      title: "Call +97143705995",
      rel: "noopener noreferrer"
    },
    {
      href: "https://maps.app.goo.gl/8mjnQzEpgE8QBK4t6",
      icon: (
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="fill-current h-4 w-4 sm:h-6 sm:w-6 mr-2">
          <line stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" x1="56" x2="200" y1="232" y2="232"></line>
          <circle cx="128" cy="104" r="32" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" fill="none"></circle>
          <path d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" fill="none"></path>
        </svg>
      ),
      text: "Near Burjuman Metro",
      ariaLabel: "Main office location near Burjuman Metro",
      title: "Location near Burjuman Metro",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "rounded-tr-md w-60"
    },
    // Second Row
    {
      href: "https://wa.me/97142846712?text=Hi%2C%20I%20was%20in%20your%20website.%20I'd%20like%20to%20enquire%20about%20%20Visa%20Services.%20Thanks",
      icon: (
        <svg className="h-4 w-4 sm:h-6 sm:w-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <path fill="#005752" d="M16.004,31c-2.868,0-5.646-0.811-8.05-2.347l-5.348,1.709c-0.179,0.057-0.376,0.009-0.509-0.125c-0.132-0.134-0.178-0.332-0.117-0.51l1.725-5.146C1.935,22.061,1,19.1,1,16c0-4.076,1.612-7.891,4.539-10.742C5.736,5.066,6.053,5.07,6.246,5.267c0.192,0.198,0.188,0.515-0.01,0.707C3.505,8.636,2,12.196,2,16c0,2.974,0.922,5.811,2.665,8.204c0.095,0.131,0.121,0.3,0.069,0.454l-1.492,4.452l4.633-1.481c0.144-0.047,0.302-0.024,0.429,0.059C10.589,29.2,13.252,30,16.004,30C23.722,30,30,23.72,30,16c0-7.719-6.278-14-13.996-14c-2.167,0-4.238,0.481-6.164,1.429C9.589,3.55,9.29,3.449,9.168,3.202S9.147,2.654,9.396,2.532C11.46,1.516,13.682,1,15.996,1C24.272,1,31,7.729,31,16S24.272,31,16.004,31z"></path>
          <path fill="#005752" d="M20.602,24.493c-1.011,0-2.422-0.39-4.439-1.226c-2.633-1.09-5.243-3.374-7.35-6.429c-0.696-0.951-1.823-2.773-1.823-4.675c0-2.229,1.115-3.36,1.592-3.843c0.449-0.461,1.12-0.706,1.874-0.706c0.19,0,0.36,0.009,0.515,0.018c0.635,0.025,1.003,0.185,1.353,1.022l0.363,0.88c0.384,0.931,0.857,2.08,0.931,2.235c0.082,0.169,0.331,0.688,0.054,1.228c-0.148,0.316-0.293,0.483-0.492,0.713c-0.14,0.161-0.233,0.261-0.328,0.361c-0.11,0.118-0.222,0.234-0.334,0.375c-0.193,0.226-0.193,0.226-0.128,0.339c0.37,0.625,1.157,1.825,2.253,2.8c1.422,1.265,2.571,1.73,3.123,1.954l0.137,0.056c0.145,0.06,0.328,0.103,0.465-0.042c0.248-0.267,0.562-0.706,0.894-1.171l0.199-0.279c0.349-0.493,0.779-0.597,1.078-0.597c0.175,0,0.357,0.035,0.543,0.105c0.465,0.162,2.912,1.381,2.937,1.393l0.235,0.115c0.35,0.168,0.626,0.301,0.784,0.579c0.229,0.398,0.139,1.442-0.209,2.427c-0.417,1.179-1.967,2.1-3.213,2.368C21.293,24.438,20.998,24.493,20.602,24.493z"></path>
        </svg>
      ),
      text: "WhatsApp",
      ariaLabel: "Chat with our branch office about visa services on WhatsApp",
      title: "WhatsApp branch office",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "rounded-bl-md"
    },
    {
      href: "tel:+97143333221",
      icon: (
        <svg viewBox="0 0 256 256" className="h-4 w-4 sm:h-6 sm:w-6 mr-2 fill-current" xmlns="http://www.w3.org/2000/svg">
          <path d="M159.4,40A80.1,80.1,0,0,1,216,96.6" fill="none" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
          <path d="M151.1,70.9a47.9,47.9,0,0,1,34,34" fill="none" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
          <path d="M92.5,124.8a83.6,83.6,0,0,0,39,38.9,8,8,0,0,0,7.9-.6l25-16.7a7.9,7.9,0,0,1,7.6-.7l46.8,20.1a7.9,7.9,0,0,1,4.8,8.3A48,48,0,0,1,176,216,136,136,0,0,1,40,80,48,48,0,0,1,81.9,32.4a7.9,7.9,0,0,1,8.3,4.8l20.1,46.9a8,8,0,0,1-.6,7.5L93,117A8,8,0,0,0,92.5,124.8Z" fill="none" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></path>
        </svg>
      ),
      text: "Call",
      ariaLabel: "Call our branch office",
      title: "Call +97143333221",
      rel: "noopener noreferrer"
    },
    {
      href: "https://maps.app.goo.gl/MxE3C8sJQmWZcGCm9",
      icon: (
        <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" className="fill-current h-4 w-4 sm:h-6 sm:w-6 mr-2">
          <line stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" x1="56" x2="200" y1="232" y2="232"></line>
          <circle cx="128" cy="104" r="32" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" fill="none"></circle>
          <path d="M208,104c0,72-80,128-80,128S48,176,48,104a80,80,0,0,1,160,0Z" stroke="#005752" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" fill="none"></path>
        </svg>
      ),
      text: "Near World Trade Metro",
      ariaLabel: "Branch office location near World Trade Metro",
      title: "Location near World Trade Metro",
      target: "_blank",
      rel: "noopener noreferrer",
      className: "rounded-br-md w-60"
    }
  ];

  return (
    <section id="hero" className="relative h-[65vh] overflow-hidden bg-gray-100">
      {/* Image Slider */}
      <ImageSlider 
        slides={slides}
        autoAdvance={true}
        interval={5000}
        showDots={true}
        dotsColor="#008c95"
      />

      {/* Hero Overlay */}
      <HeroOverlay
        companyName="Green Apple Travel & Tourism"
        companyIcon={companyIcon}
        heading="Worldwide Visa & Tours: Your Global Journey Starts Here"
        subtitle="Your trusted partner for visas and tours from the UAE to the world."
        actionButtons={actionButtons}
      />
    </section>
  );
}