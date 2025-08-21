import type { ReactNode } from "react";

import Footer from "./layout-items/Footer";
import Navbar from "./layout-items/Navbar";



interface IProps {
    children: ReactNode
}

export default function CommonLayout({ children }: IProps) {
    return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-50 shadow-md">
        <Navbar />
      </div>
      <main className="flex-1 pt-0">
        {children}
      </main>

      <Footer />
    </div>
    )
}
