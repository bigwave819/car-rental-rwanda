
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/auth");
  }

  if (session.user.role == "admin") {
    redirect("/admin/cars")
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-6">My Profile</h1>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-6">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem label="Role" value={user.role || "unknown"} />
            <InfoItem label="Account Status" value="Active" />
            <InfoItem
              label="Joined"
              value={new Date(user.createdAt).toLocaleDateString()}
            />
            <InfoItem label="User ID" value={user.id} />
          </div>          
        </div>
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border rounded-xl p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium capitalize">{value}</p>
    </div>
  );
}
