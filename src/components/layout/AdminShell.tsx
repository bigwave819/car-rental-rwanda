"use client";

import { useState } from "react";
import SideBar from "./Sidebar";
import AdminNav from "./AdminNav";

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden text-slate-900">
      <SideBar isOpen={sidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <AdminNav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
