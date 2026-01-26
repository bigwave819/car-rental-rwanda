export const dynamic = "force-dynamic";
import { getAllUserBookings } from "@/actions/user-action";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function BookingsPage() {
  const bookings = await getAllUserBookings();

  const session = await auth.api.getSession({
      headers: await headers(),
    });

  if (!session?.user) {
      redirect("/auth");
    }
  
    if (session.user.role == "admin") {
      redirect("/admin/cars")
    }

  return (
    <div className="min-h-screen p-6 bg-slate-50">
      <h1 className="text-2xl font-bold mb-6 text-slate-900">Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-slate-600">No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b: any) => {
            const start = new Date(b.startDate);
            const end = new Date(b.endDate);
            const daysBooked =
              Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

            return (
              <div
                key={b.bookingId}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col gap-3"
              >
                {/* Car Info */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {b.carBrand} {b.carName}
                  </h2>
                  <p className="text-sm text-slate-500">{daysBooked} day(s) booked</p>
                </div>

                {/* User Info */}
                <div>
                  <p className="text-sm text-slate-500">Booked by:</p>
                  <p className="font-semibold text-slate-900">{b.userName}</p>
                  <p className="text-sm text-slate-500">{b.userEmail}</p>
                </div>

                {/* Booking Details */}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-slate-500">Total Price:</p>
                    <p className="font-bold text-blue-600">
                      RWF {b.totalPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs capitalize ${
                        b.status === "pending"
                          ? "bg-yellow-500"
                          : b.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-sm text-slate-500">Phone:</p>
                  <p className="font-semibold text-slate-900">{b.phone}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BookingsPage;
