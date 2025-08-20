'use client';

interface ActionButton {
  href: string;
  icon: React.ReactNode;
  text: string;
  ariaLabel: string;
  title: string;
  target?: string;
  rel?: string;
  className?: string;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  className?: string;
  buttonClassName?: string;
}

export default function ActionButtons({ 
  buttons, 
  className = '', 
  buttonClassName = '' 
}: ActionButtonsProps) {
  // Split buttons into two rows (first 3, then remaining)
  const firstRow = buttons.slice(0, 3);
  const secondRow = buttons.slice(3);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* First Row */}
      <div className="flex justify-start">
        {firstRow.map((button, index) => (
          <a
            key={index}
            href={button.href}
            target={button.target || '_self'}
            rel={button.rel || ''}
            aria-label={button.ariaLabel}
            title={button.title}
            className={`inline-flex items-center px-4 py-3 sm:py-2 hover:bg-[#e5eeed] bg-white border border-[#e5eeed] font-semibold text-xs tracking-widest shadow-sm focus:outline-none focus:border-[#e5eeed] disabled:opacity-25 transition ${button.className || ''} ${buttonClassName}`}
          >
            {button.icon}
            <span className="h-6 text-xs text-[rgba(0,118,111,1)] items-center text-opacity-80 leading-3 text-left capitalize">
              {button.text}
            </span>
          </a>
        ))}
      </div>

      {/* Second Row */}
      {secondRow.length > 0 && (
        <div className="flex justify-start">
          {secondRow.map((button, index) => (
            <a
              key={index + 3}
              href={button.href}
              target={button.target || '_self'}
              rel={button.rel || ''}
              aria-label={button.ariaLabel}
              title={button.title}
              className={`inline-flex items-center px-4 py-3 sm:py-2 hover:bg-[#e5eeed] bg-white border border-[#e5eeed] font-semibold text-xs tracking-widest shadow-sm focus:outline-none focus:border-[#e5eeed] disabled:opacity-25 transition ${button.className || ''} ${buttonClassName}`}
            >
              {button.icon}
              <span className="h-6 text-xs text-[rgba(0,118,111,1)] items-center text-opacity-80 leading-3 text-left capitalize">
                {button.text}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
