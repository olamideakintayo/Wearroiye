import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://wearroiye.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Wearroiye — Dreams Turned Reality",
    template: "%s — Wearroiye",
  },
  description:
    "Wear your growth, your discipline, your quiet confidence. Discover Wearroiye’s Dreams Turned Reality collection.",
  keywords: ["Wearroiye", "Roiye", "Nigerian fashion", "Dreams Turned Reality", "streetwear"],
  openGraph: {
    title: "Wearroiye — Dreams Turned Reality",
    description: "Roiye isn’t something you are. It’s something you grow into.",
    type: "website",
    images: [
      {
        url: "/media/brand/dreams-turned-reality.jpeg",
        width: 1920,
        height: 1080,
        alt: "Dreams Turned Reality — Wearroiye",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wearroiye — Dreams Turned Reality",
    description: "Wear your becoming.",
    images: ["/media/brand/dreams-turned-reality.jpeg"],
  },
  icons: {
    icon: "/media/brand/wearroiye-logo.jpeg",
    apple: "/media/brand/wearroiye-logo.jpeg",
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
