'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Tour Packages', href: '#tour-packages' },
    { name: 'Umrah Packages', href: '#umrah-packages' },
    { name: 'Visa Services', href: '#visa-services' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQs', href: '#faqs' },
    { name: 'Contact', href: '#contact' },
  ];

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Prevent body scroll when mobile menu is open
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore body scroll when component unmounts
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  // Close mobile menu when clicking on a link
  const handleMobileMenuClick = (href: string) => {
    scrollToSection(href);
  };

  return (
    <header ref={headerRef} className="bg-white shadow-xl left-0 right-0 container fixed top-0 w-full z-50 mx-auto rounded-b-md">
      <div className="max-w-6xl mx-auto px-2 sm:px-6 lg:px-8 container">
        <div className="relative flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6 fill-current text-[rgba(0,118,111,1)]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 flex items-center sm:items-stretch justify-start ml-5">
            <div className="flex flex-shrink-0 items-center">
              <button 
                onClick={() => scrollToSection('#hero')}
                className="transform scale-150 cursor-pointer"
              >
                {/* Mobile Logo */}
                <Image
                  src="/images/mobile-logo.avif"
                  alt="Green Apple Travel Logo"
                  width={180}
                  height={48}
                  className="h-10 w-auto block sm:hidden"
                  priority
                />
                {/* Desktop Logo */}
                <Image
                  src="/images/logo.webp"
                  alt="Green Apple Travel Logo"
                  width={180}
                  height={48}
                  className="h-10 w-auto hidden sm:block"
                  priority
                />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:flex space-x-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="inline-flex items-center px-1 pt-1 text-sm leading-5 capitalize text-[rgba(0,118,111,1)] hover:text-opacity-80 transition-colors duration-200 cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay - positioned below header */}
          <div 
            className="sm:hidden fixed top-20 left-0 right-0 bottom-0 z-40"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            onClick={() => setIsMenuOpen(false)}
          />
          {/* Mobile Menu */}
          <div className="sm:hidden relative z-50">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200 shadow-lg rounded-b-md">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleMobileMenuClick(link.href)}
                  className="block w-full text-left px-3 py-3 text-base font-medium text-[rgba(0,118,111,1)] hover:text-opacity-80 hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </header>
  );
}
