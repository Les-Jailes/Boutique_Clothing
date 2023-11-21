import { Inter } from "next/font/google";
import "./globals.css";
import "@/css/General.css";
import Navbar from "@/components/navbar/Navbar";
import AuthProvider from "@/components/authProvider/AuthProvider";
import Footer from "@/components/footer/Footer";
import { CartProvider } from "@/components/Products/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Boutique - Clothing",
  description: "The best e-commerce",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <AuthProvider>
            <Navbar />
            {children}
            <Footer />
            <ToastContainer />
          </AuthProvider>
        </CartProvider>
      </body>
    </html>
  );
}