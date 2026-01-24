import Image from "next/image";
import { UsersRound, Tag } from "lucide-react";

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

function ViewCars({ cars }: CarListProps) {  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
      {cars.map((item) => (
        <div
          key={item.id}
          className="group overflow-hidden border border-slate-200 bg-white transition-all hover:shadow-xl"
        >
          {/* Image Container */}
          <div className="h-52 bg-slate-100 relative overflow-hidden">
            <Image
              src={item.fileUrl}
              alt={item.name}
              fill
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-3 left-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white shadow-sm ${item.status?.toLowerCase() === 'available' ? 'bg-green-500' : 'bg-orange-500'
                }`}>
                {item.status || "unknown"}
              </span>
            </div>
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-tl-xl font-bold">
              Frw {item.pricePerDay}<span className="text-xs font-normal opacity-80">/day</span>
            </div>
          </div>
          <div className="p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">{item.brand}</p>
                <h2 className="text-xl font-bold text-slate-800 leading-tight">{item.name}</h2>
              </div>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 text-slate-600">
              <div className="flex items-center gap-1.5 text-sm">
                <UsersRound size={18} className="text-slate-400" />
                <span>{item.seats} Seats</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm">
                <Tag size={18} className="text-slate-400" />
                <span className="capitalize">{item.transimission}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewCars;