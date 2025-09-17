"use client"
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
// import AnnouncementBar from '@/app/header/component/announcementBar';

const HeroSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
    const [isContentHovered, setIsContentHovered] = useState(false);
    const progressInterval = useRef<NodeJS.Timeout | null>(null);
    const mainSwiperRef = useRef<SwiperRef>(null);
    const progressStartTime = useRef(0);
    const pausedProgress = useRef(0);
    const progressDuration = 5000;

    // Slide data
    const slides = [
        {
            id: 1,
            image: '/images/hero/heroOne.jpg',
            title: 'Escape to Armenia',
            subtitle: '3 Nights / 4 Days · Quad Sharing · AED 1,250',
            description: '4★ Hotel · Breakfast · Transfers · Explore Yerevan, Lake Sevan, Pearl of Armenia',
            buttonText: 'Book Now',
            thumbTitle: 'Armenia',
            href: '#armenia-package'
        },
        {
            id: 2,
            image: '/images/hero/heroTwo.jpg',
            title: 'Discover Istanbul',
            subtitle: '3 Nights / 4 Days · Quad Sharing · AED 1,450',
            description: '4★ Hotel · Breakfast · Transfers · Visit Blue Mosque, Hagia Sophia, Topkapi Palace, Grand Bazaar',
            buttonText: 'Book Now',
            thumbTitle: 'Istanbul',
            href: '#istanbul-package'
        },
        {
            id: 3,
            image: '/images/hero/heroThree.jpg',
            title: 'Russian Adventure',
            subtitle: '4 Nights / 5 Days · Quad Sharing · AED 1,999',
            description: '4★ Hotel · Breakfast · Transfers · Explore Moscow, Red Square, Pushkin Museum',
            buttonText: 'Book Now',
            thumbTitle: 'Russia',
            href: '#russia-package'
        }
    ];

    // Start progress bar animation
    useEffect(() => {
        if (progressInterval.current) {
            clearInterval(progressInterval.current);
        }

        // Reset progress when slide changes
        if (progress === 0) {
            progressStartTime.current = Date.now();
        }

        const updateProgress = () => {
            if (hoveredThumb === null && !isContentHovered) {
                const elapsed = Date.now() - progressStartTime.current;
                const newProgress = Math.min((elapsed / progressDuration) * 100, 100);

                setProgress(newProgress);

                if (newProgress >= 100) {
                    if (progressInterval.current) {
                        clearInterval(progressInterval.current);
                    }
                    // Immediately trigger slide change when progress completes
                    if (mainSwiperRef.current?.swiper) {
                        mainSwiperRef.current.swiper.slideNext();
                    }
                }
            }
        };

        // Store the interval reference
        let currentInterval: NodeJS.Timeout | null = null;

        // Only start progress if not hovering
        if (hoveredThumb === null && !isContentHovered) {
            currentInterval = setInterval(updateProgress, 50);
            progressInterval.current = currentInterval;
        }

        return () => {
            if (currentInterval) {
                clearInterval(currentInterval);
            }
        };
    }, [activeIndex, hoveredThumb, isContentHovered, progress]);

    // Handle content hover - pause autoplay and progress
    const handleContentHover = () => {
        setIsContentHovered(true);
        pausedProgress.current = progress;
        if (mainSwiperRef.current?.swiper) {
            mainSwiperRef.current.swiper.autoplay.stop();
        }
    };

    // Handle content leave - resume autoplay and progress
    const handleContentLeave = () => {
        setIsContentHovered(false);
        if (mainSwiperRef.current?.swiper && hoveredThumb === null) {
            mainSwiperRef.current.swiper.autoplay.start();
            // Adjust start time to continue from where we left off
            progressStartTime.current = Date.now() - (pausedProgress.current / 100) * progressDuration;
        }
    };

    // Handle thumbnail hover - pause autoplay and progress
    const handleThumbHover = (index: number) => {
        setHoveredThumb(index);
        pausedProgress.current = progress;
        if (mainSwiperRef.current?.swiper) {
            mainSwiperRef.current.swiper.autoplay.stop();
        }
    };

    // Handle thumbnail leave - resume autoplay and progress
    const handleThumbLeave = () => {
        setHoveredThumb(null);
        if (mainSwiperRef.current?.swiper && !isContentHovered) {
            mainSwiperRef.current.swiper.autoplay.start();
            // Adjust start time to continue from where we left off
            progressStartTime.current = Date.now() - (pausedProgress.current / 100) * progressDuration;
        }
    };

    // Handle thumbnail click to change slide
    const handleThumbClick = (index: number) => {
        if (mainSwiperRef.current?.swiper) {
            mainSwiperRef.current.swiper.slideToLoop(index);
        }
    };

    // Handle Book Now button click - scroll to contact section
    const handleBookNowClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const targetElement = document.getElementById('contact');
        if (targetElement) {
            targetElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            <div 
                className="relative h-screen w-full overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, #30D5C8 0%, #40E0D0 100%)'
                }}
            >
                {/* Cosmic Orange Overlay Accents */}
                <div className="absolute inset-0 z-5">
                    {/* Top right accent */}
                    <div 
                        className="absolute top-0 right-0 w-32 h-32 opacity-20"
                        style={{
                            background: 'radial-gradient(circle, #FF4E00 0%, transparent 70%)',
                            transform: 'translate(50%, -50%)'
                        }}
                    />
                    {/* Bottom left accent */}
                    <div 
                        className="absolute bottom-0 left-0 w-24 h-24 opacity-15"
                        style={{
                            background: 'radial-gradient(circle, #FF4E00 0%, transparent 70%)',
                            transform: 'translate(-50%, 50%)'
                        }}
                    />
                    {/* Center accent */}
                    <div 
                        className="absolute top-1/2 right-1/4 w-16 h-16 opacity-10"
                        style={{
                            background: 'radial-gradient(circle, #FF4E00 0%, transparent 70%)',
                            transform: 'translate(50%, -50%)'
                        }}
                    />
                </div>

                {/* <AnnouncementBar /> */}
                {/* Main Swiper */}
                <Swiper
                    ref={mainSwiperRef}
                    modules={[Navigation, Thumbs, Autoplay, EffectFade]}
                    effect="fade"
                    speed={1000}
                    loop={true}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                        waitForTransition: false // Reduce delay between slides
                    }}
                    onSlideChange={(swiper) => {
                        setActiveIndex(swiper.realIndex);
                        setProgress(0); // Reset progress on slide change
                    }}
                    className="h-full w-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={slide.id} className="relative h-full w-full">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                {/* Left to right gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-transparent"></div>
                            </div>
                            {/* Content */}
                            <div
                                className="absolute bottom-[25%] left-[10%] z-50 max-w-4xl text-white"
                                onMouseEnter={handleContentHover}
                                onMouseLeave={handleContentLeave}
                            >
                                <AnimatePresence mode="wait">
                                    {activeIndex === index && (
                                        <>
                                            <motion.p
                                                key={`thumb-${slide.id}`}
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    hidden: { opacity: 0, y: 30 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                                }}
                                                transition={{ delay: 0.2 }}
                                                className="text-lg mb-4"
                                                style={{ color: '#FF4E00' }}
                                            >
                                                {slide.thumbTitle.toUpperCase()}
                                            </motion.p>
                                            <motion.h2
                                                key={`title-${slide.id}`}
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    hidden: { opacity: 0, y: 30 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                                }}
                                                className="text-4xl md:text-5xl font-bold mb-4"
                                                style={{ color: '#FF4E00' }}
                                            >
                                                {slide.title}
                                            </motion.h2>
                                            <motion.p
                                                key={`subtitle-${slide.id}`}
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    hidden: { opacity: 0, y: 30 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                                }}
                                                transition={{ delay: 0.3 }}
                                                className="text-xl mb-4"
                                                style={{ color: 'white' }}
                                            >
                                                {slide.subtitle}
                                            </motion.p>
                                            <motion.p
                                                key={`description-${slide.id}`}
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    hidden: { opacity: 0, y: 30 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                                }}
                                                transition={{ delay: 0.4 }}
                                                className="text-lg mb-6"
                                                style={{ color: 'white' }}
                                            >
                                                {slide.description}
                                            </motion.p>
                                            <motion.a
                                                key={`btn-${slide.id}`}
                                                initial="hidden"
                                                animate="visible"
                                                variants={{
                                                    hidden: { opacity: 0, y: 30 },
                                                    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                                                }}
                                                transition={{ delay: 0.5 }}
                                                href={slide.href || '#'}
                                                onClick={handleBookNowClick}
                                                className="group inline-flex items-center gap-3 px-2 py-3 text-white font-medium rounded-full cursor-pointer"
                                            >
                                                <span 
                                                    className="rounded-full px-6 py-3 group-hover:opacity-90 transition-all duration-300"
                                                    style={{
                                                        backgroundColor: '#FF4E00',
                                                        color: 'white'
                                                    }}
                                                >
                                                    {slide.buttonText}
                                                </span>
                                                <motion.div
                                                    className="relative w-8 h-8 flex items-center justify-center overflow-hidden"
                                                    initial={{ width: 0 }}
                                                    whileHover={{ width: 32 }}
                                                    transition={{ duration: 0.3 }}
                                                >
                                                    <motion.svg
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="absolute"
                                                        initial={{ x: 24 }}
                                                        whileHover={{ x: 0 }}
                                                        transition={{ duration: 0.3, delay: 0.1 }}
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M14.4016 3.9304C13.9986 3.52743 13.3452 3.52743 12.9423 3.9304C12.5393 4.33337 12.5393 4.98671 12.9423 5.38968L18.5363 10.9837H2.93184C2.39455 10.9837 1.95898 11.4192 1.95898 11.9565C1.95898 12.4938 2.39455 12.9294 2.93184 12.9294H18.5362L12.9422 18.5233C12.5393 18.9263 12.5393 19.5796 12.9422 19.9826C13.3452 20.3856 13.9986 20.3856 14.4015 19.9826L21.6978 12.6863C21.8789 12.5052 21.9786 12.2736 21.9969 12.0368C22.0195 11.7466 21.9198 11.4486 21.6978 11.2267L14.4016 3.9304Z"
                                                            fill="currentColor"
                                                        />
                                                    </motion.svg>
                                                </motion.div>
                                            </motion.a>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Thumbnail Container - Fixed at bottom */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-7xl px-4">
                    <div className="flex justify-center space-x-3">
                        {slides.map((slide, index) => (
                            <motion.div
                                key={slide.id}
                                className={`relative cursor-pointer ${index === activeIndex ? 'md:flex-1 flex-[4]' : 'flex-1'}`}
                                onMouseEnter={() => handleThumbHover(index)}
                                onMouseLeave={handleThumbLeave}
                                onClick={() => handleThumbClick(index)}
                            >
                                {/* Hover image (hidden on mobile and for active thumbnail) */}
                                {hoveredThumb === index && index !== activeIndex && (
                                    <motion.div
                                        className="absolute bottom-full left-0 right-0 mb-2 z-10 hidden md:block"
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            scale: 1
                                        }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <div className="relative w-full h-32 rounded-lg overflow-hidden shadow-lg">
                                            <Image
                                                src={slide.image}
                                                alt={slide.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </motion.div>
                                )}

                                {/* Thumbnail content */}
                                <div className="flex flex-col items-center relative">
                                    {/* Thumbnail title (hidden on mobile) */}
                                    <p className="text-xs text-center text-gray-200 mb-2 font-medium hidden md:block">
                                        {slide.thumbTitle.toUpperCase()}
                                    </p>

                                    {/* Progress bar container with animation only on mobile */}
                                    <motion.div
                                        className="w-full bg-gray-600 relative overflow-hidden rounded-full h-1"
                                        initial={false}
                                        animate={{
                                            height: 4,
                                        }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 30,
                                            duration: 0.5
                                        }}
                                    >
                                        {/* Active progress bar */}
                                        {index === activeIndex && (
                                            <motion.div
                                                className="absolute top-0 left-0 h-full rounded-full"
                                                style={{
                                                    background: "linear-gradient(90deg, #30D5C8 0%, #40E0D0 50%, #FF4E00 100%)"
                                                }}
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{
                                                    type: "tween",
                                                    ease: "linear",
                                                    duration: 0.05
                                                }}
                                            />
                                        )}

                                        {/* Inactive state */}
                                        {index !== activeIndex && (
                                            <div className="absolute top-0 left-0 w-full h-full bg-gray-500/40"></div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeroSlider;