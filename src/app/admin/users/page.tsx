import { getAllUser } from "@/actions/admin-actions";
import UsersList from "@/components/admin/user/UsersList";

async function UsersPage() {
  const users = await getAllUser();

  return (
    <div className="w-full min-h-screen space-y-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">
            Manage all registered users in one place.
          </p>
        </div>

        <input
          placeholder="Search all users..."
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
      </div>

      {/* Table */}
      <UsersList users={users} />

    </div>
  );
}

export default UsersPage;
