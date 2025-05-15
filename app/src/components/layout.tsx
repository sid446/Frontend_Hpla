import React from "react";
import LatestNews from "./LatestNews";
import Footer from "./footer";
import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <main className="flex flex-col min-h-screen mx-[0.7vw] scrollbar-hide">
      <Navbar />

      <div className="flex flex-wrap">
        <div className="flex-grow max-w-8xl mx-auto border-t p-4 md:w-3/4">
          {children}
        </div>
        <div className="flex-none w-full md:w-1/4">
          <LatestNews />
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default Layout;
