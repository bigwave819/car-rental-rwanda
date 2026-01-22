"use client";

import { useState } from "react";
import SideBar from "@/components/layout/Sidebar";
import AdminNav from "@/components/layout/AdminNav";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">

      <SideBar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col">
        <AdminNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-4 lg:p-6">
          {children}
        </main>
      </div>

    </div>
  );
}

export default AdminLayout;
