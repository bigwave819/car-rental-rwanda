export const dynamic = "force-dynamic";
import { getAllBookings } from "@/actions/admin-actions";

export default async function BookingsPage() {
  const bookings = await getAllBookings();

  if (!bookings || bookings.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Bookings</h1>
        <p className="text-gray-500">No bookings found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((booking) => {
            const days =
              (new Date(booking.endDate).getTime() -
                new Date(booking.startDate).getTime()) /
              (1000 * 60 * 60 * 24);

            return (
              <div
                key={booking.id}
                className="bg-white rounded-2xl shadow p-6 space-y-4"
              >
                {/* Status */}
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">
                    Booking Status
                  </span>
                  <StatusBadge status={booking.status} />
                </div>

                {/* User Info */}
                <div>
                  <h3 className="font-semibold text-lg">User</h3>
                  <p className="text-sm">{booking.user?.name}</p>
                  <p className="text-sm text-gray-500">
                    {booking.user?.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    📞 {booking.phone}
                  </p>
                </div>

                {/* Car Info */}
                <div>
                  <h3 className="font-semibold text-lg">Car</h3>
                  <p className="text-sm">
                    {booking.car?.name} — {booking.car?.model}
                  </p>
                </div>

                {/* Booking Info */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <Info label="Start Date" value={formatDate(booking.startDate)} />
                  <Info label="End Date" value={formatDate(booking.endDate)} />
                  <Info label="Days" value={`${days} days`} />
                  <Info
                    label="Total Price"
                    value={`${booking.totalPrice} RWF`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------------- Helper Components ---------------- */

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        colors[status] || "bg-gray-100 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-gray-500">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString();
}
