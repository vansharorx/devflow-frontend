import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function MainLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="bg-[#FBF7EE] min-h-screen text-black flex flex-col md:flex-row antialiased selection:bg-[#FFE600] selection:text-black">
            {/* Sidebar */}
            <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

            {/* Right Section */}
            <div className="ml-0 md:ml-64 flex-1 min-h-screen flex flex-col min-w-0">
                {/* Navbar */}
                <Navbar setSidebarOpen={setSidebarOpen} />

                {/* Main Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto w-full">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
