import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { RESTAURANT_INFO } from "@/data/menuData";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Due Fratelli – Ratskeller Birkenwerder | Italienisches Restaurant",
  description:
    "Willkommen im Due Fratelli im historischen Ratskeller Birkenwerder (Hauptstraße 34). Authentische italienische Küche, frische Pasta, Steinofenpizza, Fisch- & Fleischspezialitäten. Tischreservierung unter Tel. 03303 2179840.",
  keywords: [
    "Due Fratelli Birkenwerder",
    "Ratskeller Birkenwerder",
    "Italienisches Restaurant Birkenwerder",
    "Speisekarte Due Fratelli",
    "Pasta Birkenwerder",
    "Rathaus Birkenwerder Restaurant",
  ],
  openGraph: {
    title: "Due Fratelli – Ratskeller Birkenwerder | Italian Food Experience",
    description:
      "Echte italienische Gastfreundschaft im historischen Ratskeller Birkenwerder. Jetzt Tisch reservieren unter 03303 2179840.",
    locale: "de_DE",
    type: "website",
  },
};

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItalianRestaurant",
  name: RESTAURANT_INFO.fullName,
  telephone: "+49-3303-2179840",
  servesCuisine: ["Italienisch", "Pizza", "Pasta", "Meeresfrüchte", "Eis"],
  priceRange: "€€",
  address: {
    "@type": "PostalAddress",
    streetAddress: RESTAURANT_INFO.address.street,
    postalCode: RESTAURANT_INFO.address.zip,
    addressLocality: RESTAURANT_INFO.address.city,
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "12:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "17:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "14:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "17:00",
      closes: "23:00",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${jakarta.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-espresso-950 text-cream-50 antialiased selection:bg-gold-500 selection:text-espresso-950">
        {children}
      </body>
    </html>
  );
}
