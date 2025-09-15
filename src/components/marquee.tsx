'use client';

export default function Marquee() {
    const items = [
        "ATOL Protected",
        "UAE Based",
        "Global Tours",
        "Visa Assistance",
        "Affordable Packages",
    ];

    return (
        <div className="relative w-full overflow-hidden bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-400 text-white marquee-pause marquee-32">
            <div className="marquee-loop flex items-center whitespace-nowrap gap-12 py-5 font-semibold w-max">
                {[...items, ...items].map((label, idx) => (
                    <span key={`${label}-${idx}`} className="text-3xl capitalize px-4">{label}</span>
                ))}
            </div>
        </div>
    );
}