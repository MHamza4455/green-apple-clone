"use client";

import Image from "next/image";

export default function WhyBookWithUs() {
  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Left column: headline, cta, avatars */}
          <div className="order-1 lg:order-none">
            <h2 className="text-4xl font-extrabold leading-tight text-teal-900 sm:text-5xl">
              WHY BOOK
              <br className="hidden sm:block" /> WITH US?
            </h2>
            <div className="mt-6">
              <button className="inline-flex items-center rounded-xl bg-amber-400 px-6 py-3 text-base font-semibold text-teal-900 shadow hover:bg-amber-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/60 focus-visible:ring-offset-2 transition-colors">
                GET A CONSULTATION
              </button>
            </div>

            {/* Avatars + blurb */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-3">
                <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white shadow">
                  <Image
                    src="/images/hero/heroOne.jpg"
                    alt="Traveler avatar"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white shadow">
                  <Image
                    src="/images/hero/heroTwo.jpg"
                    alt="Traveler avatar"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-white shadow">
                  <Image
                    src="/images/hero/heroThree.jpg"
                    alt="Traveler avatar"
                    width={48}
                    height={48}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <p className="text-teal-900/90 text-base sm:text-lg">
                Join the <span className="font-extrabold">78,000+</span>{" "}
                travelers who’ve let us handle their dream trips!
              </p>
            </div>
          </div>

          {/* Right column: features grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <FeatureCard
              icon={
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  ★
                </span>
              }
              title="12+ YEARS OF EXPERTISE"
              description="Trust your travel plans to a team with over a decade of experience in the industry."
            />
            <FeatureCard
              icon={
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  📄
                </span>
              }
              title="SEAMLESS VISA SERVICES"
              description="Enjoy hassle-free travel with our dedicated visa assistance."
            />
            <FeatureCard
              icon={
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  👥
                </span>
              }
              title="TAILORED PACKAGES FOR EVERY TRAVELER"
              description="Discover tours designed to meet diverse interests."
            />
            <FeatureCard
              icon={
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
                  ✉️
                </span>
              }
              title="24/7 CUSTOMER SUPPORT"
              description="Travel with peace of mind knowing our dedicated team is here for you."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg ring-1 ring-black/5 transition hover:shadow-xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-teal-900">{title}</h3>
      <p className="mt-2 text-teal-900/80">{description}</p>
    </div>
  );
}
