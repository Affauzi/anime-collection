import ApolloClientProvider from "@/components/templates/ApolloProvider";
import "./globals.css";
import { Inter } from "next/font/google";

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
        <body className={inter.className}>{children}</body>
      </ApolloClientProvider>
    </html>
  );
}
