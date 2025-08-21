import { Inter, Prata, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext";
import { TranslationProvider } from "@/context/TranslationContext";
import { Toaster } from "sonner";
import DynamicFavicon from "@/components/reusable/DynamicFavicon";

// Load fonts
const inter = Inter({ subsets: ["latin"] });
const prata = Prata({ subsets: ["latin"], weight: "400" });
const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Mohammed Nash - E-commerce",
  description: "A modern e-commerce website.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <DynamicFavicon />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <TranslationProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </TranslationProvider>
        </AuthProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
