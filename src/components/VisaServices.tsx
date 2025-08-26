
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
        <header className="w-full mb-6 lg:mb-0">
          <div>
            <h1 
              id="visa-services" 
              className="text-2xl sm:text-3xl uppercase font-bold title-font my-2"
              style={{ color: 'rgba(0, 140, 149, 1)' }}
            >
              Visa Services
            </h1>
            <div className="h-1 w-32 mb-4 rounded" style={{ backgroundColor: 'rgba(255, 213, 90, 1)' }}></div>
          </div>
        </header>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-8">
          {COUNTRIES.map((country, index) => (
            <div key={country.name} className="flex flex-col items-center group relative">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative bg-white p-4 rounded-2xl border border-gray-200 hover:border-[rgba(0,140,149,1)] transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
                >
                  <img
                    src={`/flags/${country.code}.svg`}
                    alt={`${country.name} flag`}
                    width={52}
                    height={36}
                    className="rounded-lg"
                    loading="lazy"
                    decoding="async"
                    style={{ objectFit: 'contain' }}
                  />
                </div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100"></div>
              </div>
              <span className="text-sm font-semibold text-gray-800 text-center group-hover:text-primary transition-all duration-300 transform group-hover:translate-y-[-2px]">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}