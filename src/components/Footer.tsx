'use client';

export default function Footer() {
  return (
    <footer className="bg-white py-8 px-4" style={{ color: 'rgba(0, 140, 149, .9)' }}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 gap-8 md:grid-cols-4">
        {/* Logo and Description */}
        <div className="space-y-4">
          <img 
            src="https://res.cloudinary.com/greenappletravel-ae/image/upload/f_auto,q_auto:good,c_scale,w_320/v1697694572/gattlogo_l50kfv.jpg" 
            alt="Radiant Way Travel Logo" 
            className="w-24 h-auto"
          />
          
          {/* Social Media Links */}
          <div className="flex items-center justify-start space-x-4">
            <a href="https://www.instagram.com/greenappledxb/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
              <span className="sr-only">Instagram</span>
              <svg className="w-6 h-6" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgba(0, 140, 149, .9)' }}>
                <rect fill="none" height="256" width="256"></rect>
                <circle cx="128" cy="128" fill="none" r="40" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8"></circle>
                <rect fill="none" height="184" rx="48" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="8" width="184" x="36" y="36"></rect>
                <circle cx="180" cy="76" r="8"></circle>
              </svg>
            </a>
            
            <a href="https://wa.me/97143705995" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
              <span className="sr-only">WhatsApp</span>
              <svg className="h-6 w-6" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgba(0, 140, 149, .9)' }}>
                <path d="M16.004,31c-2.868,0-5.646-0.811-8.05-2.347l-5.348,1.709c-0.179,0.057-0.376,0.009-0.509-0.125   c-0.132-0.134-0.178-0.332-0.117-0.51l1.725-5.146C1.935,22.061,1,19.1,1,16c0-4.076,1.612-7.891,4.539-10.742   C5.736,5.066,6.053,5.07,6.246,5.267c0.192,0.198,0.188,0.515-0.01,0.707C3.505,8.636,2,12.196,2,16   c0,2.974,0.922,5.811,2.665,8.204c0.095,0.131,0.121,0.3,0.069,0.454l-1.492,4.452l4.633-1.481   c0.144-0.047,0.302-0.024,0.429,0.059C10.589,29.2,13.252,30,16.004,30C23.722,30,30,23.72,30,16c0-7.719-6.278-14-13.996-14   c-0.001,0-0.002,0-0.003,0c-2.167,0-4.238,0.481-6.164,1.429C9.589,3.55,9.29,3.449,9.168,3.202S9.147,2.654,9.396,2.532   C11.46,1.516,13.682,1,15.996,1C24.272,1,31,7.729,31,16S24.272,31,16.004,31z" fill="currentColor"></path>
                <g>
                  <path d="M20.602,24.493L20.602,24.493c-1.011,0-2.422-0.39-4.439-1.226c-2.633-1.09-5.243-3.374-7.35-6.429    l-0.075-0.107c-0.696-0.951-1.823-2.773-1.823-4.675c0-2.229,1.115-3.36,1.592-3.843c0.449-0.461,1.12-0.706,1.874-0.706    c0.19,0,0.36,0.009,0.515,0.018c0.635,0.025,1.003,0.185,1.353,1.022l0.363,0.88c0.384,0.931,0.857,2.08,0.931,2.235    c0.082,0.169,0.331,0.688,0.054,1.228c-0.148,0.316-0.293,0.483-0.492,0.713c-0.14,0.161-0.233,0.261-0.328,0.361    c-0.11,0.118-0.222,0.234-0.334,0.375c-0.193,0.226-0.193,0.226-0.128,0.339c0.37,0.625,1.157,1.825,2.253,2.8    c1.422,1.265,2.571,1.73,3.123,1.954l0.137,0.056c0.145,0.06,0.328,0.103,0.465-0.042c0.248-0.267,0.562-0.706,0.894-1.171    l0.199-0.279c0.349-0.493,0.779-0.597,1.078-0.597c0.175,0,0.357,0.035,0.543,0.105c0.465,0.162,2.912,1.381,2.937,1.393    l0.235,0.115c0.35,0.168,0.626,0.301,0.784,0.579c0.229,0.398,0.139,1.442-0.209,2.427c-0.417,1.179-1.967,2.1-3.213,2.368    C21.293,24.438,20.998,24.493,20.602,24.493z M10.38,8.507c-0.472,0-0.902,0.142-1.124,0.369c-0.461,0.468-1.342,1.361-1.342,3.18    c0,1.181,0.585,2.658,1.605,4.051l0.116,0.165c1.998,2.898,4.452,5.055,6.909,6.072c1.893,0.785,3.182,1.15,4.057,1.15l0,0    c0.3,0,0.523-0.042,0.727-0.085c0.973-0.21,2.198-0.929,2.479-1.724c0.304-0.857,0.298-1.516,0.262-1.647    c-0.002,0.031-0.182-0.054-0.327-0.124l-0.249-0.122c-0.701-0.351-2.513-1.236-2.83-1.347c-0.084-0.032-0.148-0.045-0.202-0.045    c-0.045,0-0.138,0-0.264,0.178l-0.2,0.28c-0.351,0.492-0.682,0.956-0.976,1.272c-0.377,0.403-1.024,0.515-1.581,0.283    l-0.127-0.052c-0.557-0.225-1.862-0.753-3.413-2.133c-1.196-1.066-2.049-2.363-2.451-3.042c-0.423-0.729,0.006-1.231,0.212-1.472    c0.131-0.163,0.259-0.298,0.387-0.434c0.084-0.089,0.168-0.178,0.254-0.278c0.225-0.259,0.299-0.345,0.396-0.552    c0.029-0.057,0.045-0.138-0.059-0.354c-0.076-0.16-0.562-1.334-0.953-2.286l-0.362-0.877c-0.165-0.396-0.165-0.396-0.479-0.408    C10.701,8.515,10.549,8.507,10.38,8.507z" fill="currentColor"></path>
                </g>
                <g>
                  <circle cx="7.5" cy="4" fill="currentColor" r="0.5"></circle>
                </g>
              </svg>
            </a>
            
            <a href="https://facebook.com/greenappledxb" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300">
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ color: 'rgba(0, 140, 149, .9)' }}>
                <g id="Layer_2">
                  <g>
                    <path d="M96.106,48.881c-0.77,0-1.394,0.626-1.394,1.399c0,21.747-15.13,40.061-36.21,44.154V65.087h9.376    c0.688,0,1.273-0.504,1.378-1.187l2.049-13.408c0.144-0.82-0.548-1.631-1.378-1.611H58.502V41.58    c0.033-7.334,6.8-5.65,11.967-5.844c0.77,0,1.394-0.626,1.394-1.399V22.922c0-0.682-0.49-1.264-1.16-1.379    c-10.045-1.739-23.925-2.366-28.31,10.912c-0.535,1.77,2.047,2.602,2.648,0.872c3.489-10.805,14.71-10.674,24.034-9.203    c0,0,0,8.814,0,8.814h-4.434c-5.589,0-8.926,3.231-8.926,8.642v8.7c0,0.773,0.624,1.399,1.394,1.399h11.194l-1.621,10.61h-9.573    c-0.77,0-1.394,0.626-1.394,1.399v32.411c0,0.409,0.178,0.797,0.488,1.063C79.727,95.639,97.593,73.726,97.5,50.281    C97.5,49.507,96.875,48.881,96.106,48.881z" fill="currentColor"></path>
                    <path d="M42.665,38.663c-0.77,0-1.394,0.626-1.394,1.399v8.819H30.929c-0.77,0-1.394,0.626-1.394,1.399v13.408    c0,0.773,0.624,1.399,1.394,1.399h10.341v29.347C-11.554,82.852-4.204,6.699,49.886,5.298c21.636,0,40.176,15.473,44.084,36.791    c0.14,0.76,0.864,1.263,1.624,1.122c0.757-0.14,1.258-0.869,1.119-1.629C92.561,18.937,72.867,2.5,49.886,2.5    c-58.451,1.627-65.011,84.401-7.437,94.981c0.815,0.145,1.63-0.545,1.609-1.382c0,0,0-32.411,0-32.411    c0-0.773-0.624-1.399-1.394-1.399H32.323v-10.61h10.341c0.77,0,1.394-0.626,1.394-1.399V40.062    C44.059,39.289,43.434,38.663,42.665,38.663z" fill="currentColor"></path>
                  </g>
                </g>
              </svg>
            </a>
          </div>
          
          <p className="text-xs font-light" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>
            Our expert team takes pride in their thoughtful approach to planning your holiday. We find out what you think might make it extra special, then sprinkle in our own special little touches to help create your dream holiday.
          </p>
        </div>

        {/* Quick Links */}
        <nav aria-labelledby="quick-links" className="space-y-2">
          <h3 id="quick-links" className="font-semibold" style={{ color: 'rgba(0, 140, 149, .9)' }}>Quick Links</h3>
          <ul className="space-y-1 text-sm font-light">
            <li><a href="#" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>Home</a></li>
            <li><a href="#contact" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>Contact Us</a></li>
            <li><a href="#why-choose-us" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>Why Us</a></li>
          </ul>
        </nav>

        {/* Contact Information */}
        <aside aria-labelledby="contact-information" className="space-y-4 text-left">
          <h3 id="contact-information" className="font-semibold" style={{ color: 'rgba(0, 140, 149, .9)' }}>Contact Information</h3>
          
          {/* Main Office Contact */}
          <section aria-labelledby="main-office">
            <h4 id="main-office" className="font-medium" style={{ color: 'rgba(0, 140, 149, .9)' }}>Main Office</h4>
            <address className="not-italic">
              <p className="text-sm font-light" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>
                Phone: <a href="tel:+97143705995" className="hover:opacity-75 transition-opacity duration-300">+971 54 786 1293</a>
              </p>
              <p className="text-sm font-light" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>
                Address: Office 408, Nasser Lootah Building, Consulate Area – Dubai, UAE
              </p>
            </address>
          </section>
          
          {/* Branch Office Contact */}
          <section aria-labelledby="branch-office">
            <h4 id="branch-office" className="font-medium" style={{ color: 'rgba(0, 140, 149, .9)' }}>Branch Office</h4>
            <address className="not-italic">
              <p className="text-sm font-light" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>
                Phone: <a href="tel:+97143333221" className="hover:opacity-75 transition-opacity duration-300">+971 4 333 3221</a>
              </p>
              <p className="text-sm font-light" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>
                Address: Office 301A - API World Tower, Trade Center - Dubai, UAE
              </p>
            </address>
          </section>
        </aside>

        {/* Support */}
        <nav aria-labelledby="support" className="space-y-2">
          <h3 id="support" className="font-semibold" style={{ color: 'rgba(0, 140, 149, .9)' }}>Support</h3>
          <ul className="space-y-1 text-sm font-light">
            <li><a href="tel:+97143705995" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>Company Landline</a></li>
            <li><a href="https://wa.me/97143705995" target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>WhatsApp Support</a></li>
          </ul>
          
          <h3 id="services" className="font-semibold" style={{ color: 'rgba(0, 140, 149, .9)' }}>Services</h3>
          <ul className="space-y-1 text-sm font-light">
            <li><a href="#visa-services" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>Visa Applications</a></li>
            <li><a href="#featured-tours" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>Tour Packages</a></li>
            <li><a href="#umrah-packages" className="hover:opacity-75 transition-opacity duration-300" style={{ color: 'rgba(0, 140, 149, 0.8)' }}>Umrah Packages</a></li>
          </ul>
        </nav>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 text-xs text-center border-t pt-4" style={{ borderColor: 'rgba(0, 140, 149, 0.2)', color: 'rgba(0, 140, 149, .9)' }}>
        © 2025 Radiant Way Travel All rights reserved.
      </div>
    </footer>
  );
}
