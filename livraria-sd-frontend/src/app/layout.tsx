import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sora } from "next/font/google";
import Header from "@/components/ui/header.component";
import Footer from "@/components/ui/footer.component";
import { api } from "@/services/api";
import useAuthStore from "@/stores/auth.store";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SD Livraria",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="pt-br">
      <body
        className={`${sora.className} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}