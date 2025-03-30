import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/shared/Header";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/shared/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthInitializer from "@/components/shared/authInitializer";

const montserrat = localFont({
  src: [
    {
      path: "../../fonts/Montserrat-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
});
const poppins = localFont({
  src: [
    {
      path: "../../fonts/Poppins-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
});
const bricolage = localFont({
  src: [
    {
      path: "../../fonts/BricolageGrotesque-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../fonts/BricolageGrotesque-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../fonts/BricolageGrotesque-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../fonts/BricolageGrotesque-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../fonts/BricolageGrotesque-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../fonts/BricolageGrotesque-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../fonts/BricolageGrotesque-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-bricolage",
});

export const metadata: Metadata = {
  title: "Memory Ball",
  description: "Your personal memory assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} ${montserrat.variable} ${poppins.variable} bg-background`}
      >
        <AuthProvider>
          <AuthInitializer>
            <Header />
            {children}
            <Footer />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AuthInitializer>
        </AuthProvider>
      </body>
    </html>
  );
}
