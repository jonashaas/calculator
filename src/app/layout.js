import { geistSans, geistMono } from "./fonts";
import "./globals.css";



export const metadata = {
  title: "Inline Calculator",
  description: "Created by Jonas haas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

