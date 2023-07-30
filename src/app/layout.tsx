import ApolloClientProvider from "@/components/templates/ApolloProvider";
import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/organism/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/organism/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anime Collection",
  description: "Anime Collection Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ApolloClientProvider>
        <body className={inter.className} style={{ margin: 0 }}>
          <ToastContainer />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </ApolloClientProvider>
    </html>
  );
}
