import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";


const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'], 
});


export const metadata: Metadata = {
  title: "Excel Pro Academy",
  description: "Excel pro academy is a football academy that provides training and development for young players.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US" dir="ltr">
      <body
        className={`${montserrat.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
