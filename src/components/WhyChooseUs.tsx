'use client';

import Image from 'next/image';

export default function WhyChooseUs() {
    const features = [
        {
            title: "12+ Years of Expertise",
            description: "Trust your travel plans to a team with over a decade of experience in the industry.",
            bgColor: "bg-blue-100",
            iconBgColor: "bg-gradient-to-br from-gray-50 to-gray-100"
        },
        {
            title: "Seamless Visa Services",
            description: "Enjoy hassle-free travel with our dedicated visa assistance.",
            bgColor: "bg-purple-100",
            iconBgColor: "bg-gradient-to-br from-gray-50 to-gray-100"
        },
        {
            title: "Tailored Packages for Every Traveler",
            description: "Discover tours designed to meet diverse interests.",
            bgColor: "bg-red-100",
            iconBgColor: "bg-gradient-to-br from-gray-50 to-gray-100"
        },
        {
            title: "24/7 Customer Support",
            description: "Travel with peace of mind knowing our dedicated team is here for you.",
            bgColor: "bg-green-100",
            iconBgColor: "bg-gradient-to-br from-gray-50 to-gray-100"
        }
    ];

    return (
        <section className="w-full bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Headline */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Why Book With Us?
                        <span className="block w-16 h-1 bg-[rgba(0,140,149,1)] mx-auto mt-2"></span>
                    </h2>
                </div>

                {/* Two Column Layout */}
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Feature Cards */}
                    <div className="space-y-6 py-6">
                        {features.map((feature, index) => (
                            <div 
                                key={index}
                                className="bg-white rounded-xl p-6 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={`${feature.iconBgColor} p-3 rounded-lg flex-shrink-0`}>
                                        {index === 0 && (
                                            <svg className="w-6 h-6" style={{color: 'rgba(0,140,149,1)', opacity: 0.9}} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.9,2.6l2.3,5c0.1,0.3,0.4,0.5,0.7,0.6l5.2,0.8C22,9,22.3,10,21.7,10.6l-3.8,3.9c-0.2,0.2-0.3,0.6-0.3,0.9 l0.9,5.4c0.1,0.8-0.7,1.5-1.4,1.1l-4.7-2.6c-0.3-0.2-0.6-0.2-0.9,0l-4.7,2.6c-0.7,0.4-1.6-0.2-1.4-1.1l0.9-5.4 c0.1-0.3-0.1-0.7-0.3-0.9l-3.8-3.9C1.7,10,2,9,2.8,8.9l5.2-0.8c0.3,0,0.6-0.3,0.7-0.6l2.3-5C11.5,1.8,12.5,1.8,12.9,2.6z"></path>
                                            </svg>
                                        )}
                                        {index === 1 && (
                                            <svg className="w-6 h-6" style={{color: 'rgba(0,140,149,1)', opacity: 0.9}} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M17.5,8C16.1,8,15,6.9,15,5.5V2c0-0.6-0.4-1-1-1H6C3.8,1,2,2.8,2,5v14c0,2.2,1.8,4,4,4h12c2.2,0,4-1.8,4-4V9    c0-0.6-0.4-1-1-1H17.5z M14,17H8c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1C15,16.6,14.6,17,14,17z M16,13H8    c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1C17,12.6,16.6,13,16,13z"></path>
                                            </svg>
                                        )}
                                        {index === 2 && (
                                            <svg className="w-6 h-6" style={{color: 'rgba(0,140,149,1)', opacity: 0.9}} fill="currentColor" viewBox="0 0 48 48">
                                                <path d="M16.6,18.58c.11,0,.21-.01,.32-.02-.08-.6-.15-1.2-.15-1.82,0-5.1,3-9.48,7.32-11.52C22.55,2.69,19.78,1,16.6,1,11.75,1,7.81,4.94,7.81,9.79,7.81,14.64,11.75,18.58,16.6,18.58Z"></path>
                                                <circle cx="29.48" cy="16.74" r="9.76"></circle>
                                                <path d="M37.99,26.37c-2.27,2.01-5.25,3.24-8.52,3.24-3.26,0-6.22-1.22-8.49-3.21-5.91,3.23-9.95,9.7-9.95,17.17,0,1.18,.1,2.32,.3,3.44h36.37c.1-.9,.1-2.05,.1-3.44,0-7.49-4.06-14-9.99-17.17Z"></path>
                                                <path d="M19.16,24.2c-.63-.89-1.15-1.85-1.54-2.88-.34,.03-.68,.05-1.02,.05-2.93,0-5.6-1.1-7.64-2.89-6.36,4.93-9.99,10.76-9.99,17.5,0,1.06,.1,2.1,.27,3.1h9.06c.3-5.65,3.94-10.29,8.83-12.93Z"></path>
                                            </svg>
                                        )}
                                        {index === 3 && (
                                            <svg className="w-6 h-6" style={{color: 'rgba(0,140,149,1)', opacity: 0.9}} fill="currentColor" viewBox="0 0 32 32">
                                                <path d="M2.0835,9.3027A4.1355,4.1355,0,0,1,6.1289,6H25.8711A4.1264,4.1264,0,0,1,29.93,9.4346L16.0044,14.9233ZM16.3667,16.93a.9989.9989,0,0,1-.7412-.003L2,11.4258V21.8711A4.1334,4.1334,0,0,0,6.1289,26H25.8711A4.1334,4.1334,0,0,0,30,21.8711V11.5562Z"></path>
                                            </svg>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Column - Image Section */}
                    <div className="relative">
                        {/* Background Layers */}
                        <div className="absolute -bottom-4 -right-4 w-full h-full bg-gray-300 rounded-tl-4xl rounded-br-4xl"></div>
                        <div className="absolute -bottom-2 -right-2 w-full h-full bg-gray-500 rounded-tl-4xl rounded-br-4xl"></div>
                        
                        {/* Main Image */}
                        <div className="relative">
                            <Image 
                                src="/whyus.jpg" 
                                alt="Why Choose Us - Professional Service"
                                width={600}
                                height={100}
                                className="w-full h-[550px] object-cover rounded-tl-4xl rounded-br-4xl shadow-lg relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}