export const dynamic = "force-dynamic";
import { getCarDetails } from "@/actions/user-action";
import BookCarDialog from "@/components/booking";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Car Details",
    description: "View detailed information about this car",
};

async function CarDetailsPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {

    const { slug } = await params
    const data = await getCarDetails(slug);
    const car = data[0];
    console.log(car);


    if (!car) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-600">Car not found</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 py-10 px-4">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="relative w-full h-75 ">
                    <Image
                        src={car.fileUrl}
                        alt={car.name}
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
                <div className="p-6 md:p-10">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                                {car.brand} {car.name}
                            </h1>
                            <p className="text-slate-500 capitalize">
                                {car.category} • {car.fueltype} • {car.transimission}
                            </p>
                        </div>

                        <div className="text-left md:text-right">
                            <p className="text-sm text-slate-500">Price per day</p>
                            <p className="text-2xl font-bold text-blue-600">
                                RWF {car.pricePerDay.toLocaleString()}
                            </p>
                        </div>
                    </div>
                    <hr className="my-6" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                        <Spec label="Seats" value={car.seats} />
                        <Spec label="Fuel Type" value={car.fueltype} />
                        <Spec label="Transmission" value={car.transimission} />
                        <Spec label="Status" value={car.status || "unknown"} />
                    </div>

                    <BookCarDialog carId={car.id} carPricePerDay={car.pricePerDay} />
                </div>
            </div>
        </div>
    );
}

function Spec({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <p className="text-slate-500">{label}</p>
            <p className="font-semibold capitalize text-slate-900">{value}</p>
        </div>
    );
}

export default CarDetailsPage;
