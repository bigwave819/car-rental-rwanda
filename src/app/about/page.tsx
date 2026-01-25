import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn more about our car rental platform and mission",
};

function AboutPage() {
  return (
    <div className="min-h-screen bg-white px-4 py-14">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            About Us
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-black/60">
            A modern car rental platform built for simplicity, trust, and comfort.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left */}
          <div className="space-y-6 text-black/80 leading-relaxed">
            <p>
              We are a premium car rental service designed to help people find
              reliable, comfortable, and affordable cars for events, travel,
              and everyday use.
            </p>

            <p>
              Our platform connects customers with well-maintained vehicles
              through a seamless and transparent booking experience. Every car
              listed is carefully reviewed to ensure quality and safety.
            </p>

            <p>
              Whether you need a luxury car for a special event or a reliable
              ride for your next journey, we make the process fast and
              stress-free.
            </p>
          </div>

          {/* Right */}
          <div className="border border-black/10 rounded-xl p-8 space-y-6">
            <Info title="Our Mission">
              To simplify car rentals by providing a trusted, user-friendly,
              and efficient platform for everyone.
            </Info>

            <Info title="Our Vision">
              To become the most reliable car rental platform, known for
              transparency, quality service, and customer satisfaction.
            </Info>

            <Info title="Our Values">
              Trust, simplicity, reliability, and customer-first experience.
            </Info>
          </div>
        </div>

        {/* Divider */}
        <div className="my-16 h-px bg-black/10" />

        {/* Why Choose Us */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black">
            Why Choose Us
          </h2>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <Feature title="Verified Cars" />
            <Feature title="Transparent Pricing" />
            <Feature title="Fast Booking" />
            <Feature title="Reliable Support" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable Components */

function Info({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm uppercase tracking-wide text-black/50">
        {title}
      </h3>
      <p className="mt-2 text-black/80 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function Feature({ title }: { title: string }) {
  return (
    <div className="border border-black/10 rounded-lg p-6">
      <p className="font-semibold text-black">{title}</p>
    </div>
  );
}

export default AboutPage;
