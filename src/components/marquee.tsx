'use client';

export default function Marquee() {
    const items = [
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            ),
            text: "ATOL Protected"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
            ),
            text: "UAE Based"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
            ),
            text: "Global Tours"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
            ),
            text: "Visa Assistance"
        },
        {
            icon: (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
            ),
            text: "Affordable Packages"
        },
    ];

    return (
        <div className="relative w-full overflow-hidden bg-white marquee-pause marquee-32">
            <div className="marquee-loop flex items-center whitespace-nowrap gap-12 py-5 font-semibold w-max">
                {[...items, ...items].map((item, idx) => (
                    <div key={`${item.text}-${idx}`} className="flex items-center gap-3 px-4">
                        <div 
                            className="flex items-center justify-center"
                            style={{ color: '#30D5C8' }}
                        >
                            {item.icon}
                        </div>
                        <span 
                            className="text-2xl capitalize"
                            style={{ color: 'black' }}
                        >
                            {item.text}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}