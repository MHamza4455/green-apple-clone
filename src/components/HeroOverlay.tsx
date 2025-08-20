'use client';

import ActionButtons from './ActionButtons';

interface HeroOverlayProps {
  companyName: string;
  companyIcon: React.ReactNode;
  heading: string;
  subtitle: string;
  actionButtons: Array<{
    href: string;
    icon: React.ReactNode;
    text: string;
    ariaLabel: string;
    title: string;
    target?: string;
    rel?: string;
    className?: string;
  }>;
  className?: string;
  pt?: string;
}

export default function HeroOverlay({
  companyName,
  companyIcon,
  heading,
  subtitle,
  actionButtons,
  className = '',
  pt = 'pt-12 md:pt-16'
}: HeroOverlayProps) {
  return (
    <div className={`absolute z-10 inset-0 flex items-center text-white ${pt} container mx-auto ${className}`}>
      <div className="space-y-4 text-left px-4 max-w-7xl container mx-auto">
        {/* Company Name with Icon */}
        <p className="text-md sm:text-lg font-light flex space-x-2 items-end justify-start">
          {companyIcon}
          <span>{companyName}</span>
        </p>

        {/* Main Heading */}
        <h2 className="text-2xl uppercase sm:text-3xl md:text-4xl max-w-2xl font-extrabold">
          {heading}
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-lg font-light">
          {subtitle}
        </p>

        {/* Action Buttons */}
        <ActionButtons 
          buttons={actionButtons}
          className="flex flex-col space-y-2"
        />
      </div>
    </div>
  );
}
