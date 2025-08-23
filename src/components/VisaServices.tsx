
'use client';

const COUNTRIES = [
  { name: 'United States', code: 'us' },
  { name: 'United Kingdom', code: 'gb' },
  { name: 'Canada', code: 'ca' },
  { name: 'Australia', code: 'au' },
  { name: 'Germany', code: 'de' },
  { name: 'France', code: 'fr' },
  { name: 'Italy', code: 'it' },
  { name: 'UAE', code: 'ae' },
  { name: 'Turkey', code: 'tr' },
  { name: 'Saudi Arabia', code: 'sa' },
];

export default function VisaServices() {
  return (
    <section id="visa-services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Visa Services</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-6 gap-x-2">
          {COUNTRIES.map((country) => (
            <div key={country.name} className="flex flex-col items-center">
              <img
                src={`/flags/${country.code}.svg`}
                alt={`${country.name} flag`}
                width={40}
                height={28}
                className="mb-1"
                loading="lazy"
                decoding="async"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-base text-gray-900 text-center">{country.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}