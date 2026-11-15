"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-surface-alt">
      <Navbar
        onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)}
        onToggleDesktopSidebar={() => setIsCollapsed((prev) => !prev)}
      />

      <div className="flex flex-1 min-w-0">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed((prev) => !prev)}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
        />

        <div className="flex flex-1 flex-col min-w-0">
          <main className="flex-1 min-w-0">{children}</main>
          <Footer />
        </div>
      </div>
    </div>
  );
}
