import Image from "next/image";
import { UsersRound, Gauge, Fuel, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Car {
  id: string;
  name: string;
  brand: string;
  seats: string;
  status: string | null;
  pricePerDay: number;
  fileUrl: string;
  transimission: string;
}

interface CarListProps {
  cars: Car[];
}

function ViewCarsClient({ cars }: CarListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
      {cars.map((item) => (
        <Link
          href={`/cars/${item.id}`}
          key={item.id}
          className="group bg-white border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="relative h-60 w-full overflow-hidden bg-slate-100">
            <Image
              src={item.fileUrl}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-sm border ${item.status?.toLowerCase() === 'available'
                ? 'bg-emerald-500/90 text-white border-emerald-400'
                : 'bg-amber-500/90 text-white border-amber-400'
                }`}>
                {item.status || "Unknown"}
              </span>
            </div>
            <div className="absolute bottom-4 right-4 bg-slate-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-xl flex flex-col items-end shadow-lg">
              <span className="text-[10px] uppercase opacity-70 font-medium">Daily Rate</span>
              <div className="font-bold text-lg leading-none">
                Frw {item.pricePerDay.toLocaleString()}
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="mb-4">
              <p className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">{item.brand}</p>
              <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                {item.name}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50 text-slate-500">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-50">
                  <UsersRound size={16} className="text-slate-400" />
                </div>
                <span className="text-sm font-medium">{item.seats} Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-50">
                  <Gauge size={16} className="text-slate-400" />
                </div>
                <span className="text-sm font-medium capitalize">{item.transimission}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ViewCarsClient;