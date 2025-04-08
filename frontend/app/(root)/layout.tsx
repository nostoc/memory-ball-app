import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import Header from "@/components/shared/Header";
import { AuthProvider } from "@/context/AuthContext";
import Footer from "@/components/shared/Footer";
import AuthInitializer from "@/components/shared/authInitializer";
import { Toaster } from "react-hot-toast";

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
  applicationName: "Memory Ball | Free Online Flash Cards",
  authors: [{ name: "Memory Ball" }],
  title: {
    default: "Memory Ball | Free Online Flash Cards",
    template: "%s | Memory Ball - Smart Flash Cards",
  },
  description: "Create, study and share flash cards for free. Boost your learning with Memory Ball's smart flash card system. Perfect for students, professionals, and lifelong learners.",
  keywords: "flash cards, online flash cards, free flash cards, study tools, learning, memorization, spaced repetition",
  openGraph: {
    images: "https://memoryball.online/og-image.png"
  },
  verification: {
    google: "zS_mrSk4epSJgqZh_WMzpWY--hxvKqASL8pY8JNCD3Q"
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://memoryball.online",
  }
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
            <Toaster
              position="top-right"
              toastOptions={{
                // Default styles for all toasts
                style: {
                  background: "#fff",
                  color: "#333",
                  fontFamily: "var(--font-montserrat)",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "16px",
                },
                // Custom styles for specific toast types
                success: {
                  iconTheme: {
                    primary: "#2CB7BE", // oceanBlue from your theme
                    secondary: "#fff",
                  },
                  style: {
                    border: "1px solid rgba(44, 183, 190, 0.2)",
                    borderLeft: "6px solid #2CB7BE",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#E53E3E",
                    secondary: "#fff",
                  },
                  style: {
                    border: "1px solid rgba(229, 62, 62, 0.2)",
                    borderLeft: "6px solid #E53E3E",
                  },
                },
                loading: {
                  iconTheme: {
                    primary: "#2E4057", // background color from your theme
                    secondary: "#fff",
                  },
                },
                duration: 4000, // Toast duration in ms
              }}
            />
          </AuthInitializer>
        </AuthProvider>
      </body>
    </html>
  );
}
