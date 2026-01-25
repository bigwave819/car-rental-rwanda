import SearchComponents from "@/components/Search";
import Image from "next/image";
import Footer from '../components/layout/Footer'
import ViewCars from "@/components/admin/cars/ViewCars";
import { getAllCars } from "@/actions/admin-actions";
import Link from "next/link";

async function Index() {
  const cars = await getAllCars()
  return (
    <>
      {/* Hero Section */}
      <section className="w-full bg-white">
        <div className="flex flex-col items-center justify-center min-h-[70vh] max-w-7xl mx-auto px-5 py-10 md:px-10 gap-10">
          <div className="w-full lg:w-2/3 text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black font-outfit tracking-tight">
              Affordable Car Rentals,<br /> Anytime, Anywhere
            </h2>
            <p className="text-gray-500 mt-5 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
              Choose from a wide range of cars at affordable prices with instant booking.
            </p>
          </div>
          <div className="w-full max-w-4xl flex justify-center">
            <Image
              src="/Cars.jfif"
              alt="Available Cars"
              width={800}
              height={500}
              className="object-contain"
              priority
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="w-full bg-white py-20">
        <div className="flex flex-col items-center max-w-7xl mx-auto px-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-black text-center font-outfit">
            Our Featured Products
          </h2>
          <p className="text-gray-500 mt-4 text-center text-sm sm:text-base">
            Explore our selection of premium vehicles available for your next adventure.
          </p>
          <div className="w-full mt-12">
            <SearchComponents />
            <ViewCars cars={cars.slice(0, 6)} />
          </div>
          <Link href={`/cars`} className="text-black border border-black px-4 py-2 cursor-pointer hover:scale-125 duration-500 ease-in">View All</Link>
        </div>
      </section>

      {/* Luxury Car Listing Section */}
      <section className="w-full bg-white py-16 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 max-w-6xl mx-auto px-6 bg-black p-8 md:p-16">
          <div className="md:w-3/5 text-white flex flex-col gap-6">
            <h1 className="text-3xl md:text-4xl font-bold font-outfit leading-tight">
                Do you own a luxury car?
            </h1>
            <p className="text-gray-300 text-sm md:text-lg leading-relaxed">
              Monetize your vehicle effortlessly by listing it on CarRental.
              We take care of insurance, driver verification and secure payments —
              so you can earn passive income, stress-free.
            </p>
            <button className="w-max px-8 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300 cursor-pointer">
              List Your Car
            </button>
          </div>
          <div className="md:w-2/5 flex justify-center">
            <Image
              src="/luxury.png"
              alt="luxury car"
              width={450}
              height={350}
              className="object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="w-full bg-white py-24">
        <div className="flex flex-col items-center justify-center gap-6 max-w-xl mx-auto px-5 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-black font-outfit">Never Miss a Deal!</h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Subscribe to get the latest offers, new arrivals, and exclusive discounts directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row w-full mt-4 gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 border border-gray-300 py-3 px-6 outline-none text-gray-400 transition"
            />
            <button className="bg-black text-white px-8 py-3 hover:bg-gray-800 transition font-medium cursor-pointer">
              Subscribe
            </button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Index;