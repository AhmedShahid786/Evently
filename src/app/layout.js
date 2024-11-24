import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";

export const metadata = {
  title: "Evently",
  description: "A Location Based Event Planner",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
