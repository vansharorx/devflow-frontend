import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="bg-[#F7E7CE]">

      {/* Sidebar */}

      <Sidebar
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />

      {/* Right Section */}

      <div
        className="
          ml-0
          md:ml-64
          min-h-screen
          flex
          flex-col
      "
      >

        {/* Navbar */}

        <Navbar
          setSidebarOpen={setSidebarOpen}
        />

        {/* Scrollable Content */}

        <main
          className="
            flex-1
            overflow-y-auto
            p-6
          "
        >

          <div className="max-w-7xl mx-auto">

            <Outlet />

          </div>

        </main>

      </div>

    </div>

  );

}