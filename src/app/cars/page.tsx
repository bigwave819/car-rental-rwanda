export const dynamic = "force-dynamic";
import { getAllCars } from "@/actions/admin-actions";
import SearchComponents from "@/components/Search";
import ViewCarsClient from "@/components/ViewCarsClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Cars | Premium Rentals",
  description: "Find the perfect car for your next event or travel journey.",
};

async function CarsPage() {
  const cars = await getAllCars();

  return (
    <div className="w-full min-h-screen bg-slate-50/50">
      <section className="relative py-8 md:py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <h1 className="text-2xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Browse cars in one place{" "}
            <span className="text-blue-600">fast & easy</span>
          </h1>

          <p className="mt-3 text-sm md:text-base text-slate-600 max-w-xl mx-auto">
            Luxury rentals and reliable travel cars for every journey.
          </p>

          <div className="mt-6 max-w-2xl mx-auto">
            <SearchComponents />
          </div>

        </div>
      </section>


      {/* Results Section */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <ViewCarsClient cars={cars} />
        </div>
      </main>
    </div>
  );
}

export default CarsPage;