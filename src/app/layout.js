import { Plus_Jakarta_Sans } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import "antd/dist/reset.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});
const magistralB = localFont({
  src: "../utils/fonts/Magistral-Bold.ttf",
  variable: "--font-magistral-bold",
});
const magistralEB = localFont({
  src: "../utils/fonts/Magistral-ExtraBold.ttf",
  variable: "--font-magistral-extrabold",
});

export const metadata = {
  title: "eSora Labs",
  description: "eSora Labs",
  icons: {
    icon: [
      {
        url: "/images/esora-logo.png",
        href: "/images/esora-logo.png",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${jakarta.variable} ${magistralB.variable} ${magistralEB.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
