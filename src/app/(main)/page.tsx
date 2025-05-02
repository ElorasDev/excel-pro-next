import type { Metadata } from "next";
import Landing from "@/components/template/Landing/Landing";

export const metadata: Metadata = {
  metadataBase: new URL("https://excel-pro-next.vercel.app"),
  title: "Excel Pro Soccer Academy | Premier Youth Soccer Training",
  description:
    "Excel Pro, founded by former Persepolis FC player Reza Abedian, offers Toronto youth personalized soccer training, focusing on skills, teamwork, and success.",
  keywords: [
    "football academy",
    "soccer training",
    "youth football",
    "soccer academy",
    "football training",
    "youth soccer",
    "Toronto soccer",
    "Excel Pro Academy",
    "Excel Pro Football Academy",
    "sports training",
  ],
  authors: [{ name: "Excel Pro Academy" }],
  creator: "Excel Pro Academy",
  publisher: "Excel Pro Academy",
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  openGraph: {
    title: "Excel Pro Soccer Academy | Professional Soccer Training in Toronto",
    description:
      "Join Toronto's premier soccer academy for youth development. Professional coaches, personalized training, and competitive programs.",
    type: "website",
    url: "https://excel-pro-next.vercel.app",
    siteName: "Excel Pro Football Academy",
    locale: "en_US",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Excel Pro Football Academy Training Programs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Pro Soccer Academy | Toronto",
    description:
      "Professional soccer training and development for youth players in Toronto.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://excel-pro-next.vercel.app",
    languages: {
      en: "https://excel-pro-next.vercel.app/",
      "en-US": "https://excel-pro-next.vercel.app/",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function Home() {
  const schemaData = [
    // Schema برای سازمان
    {
      "@context": "https://schema.org",
      "@type": "SportsOrganization",
      "@id": "https://excel-pro-next.vercel.app/#organization",
      name: "Excel Pro Football Academy",
      url: "https://excel-pro-next.vercel.app",
      logo: {
        "@type": "ImageObject",
        url: "https://excel-pro-next.vercel.app/images/logo.png",
        width: 180,
        height: 60,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Soccer Street", // آدرس واقعی خود را قرار دهید
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M1M 1M1",
        addressCountry: "CA",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-416-123-4567",
        contactType: "customer service",
        email: "info@excelproacademy.com",
      },
      sameAs: [
        "https://www.instagram.com/yourpage",
        "https://www.facebook.com/yourpage",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": "https://excel-pro-next.vercel.app/#website",
      url: "https://excel-pro-next.vercel.app",
      name: "Excel Pro Football Academy",
      description:
        "Professional soccer training and development for youth players in Toronto",
      publisher: {
        "@id": "https://excel-pro-next.vercel.app/#organization",
      },
    },
    // Schema برای صفحه وب
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": "https://excel-pro-next.vercel.app/#webpage",
      url: "https://excel-pro-next.vercel.app",
      name: "Excel Pro Football Academy | Professional Soccer Training in Toronto",
      isPartOf: {
        "@id": "https://excel-pro-next.vercel.app/#website",
      },
      about: {
        "@id": "https://excel-pro-next.vercel.app/#organization",
      },
      description:
        "Excel Pro Academy offers professional soccer training and development programs for youth aged 6-18 in Toronto. Join us to develop skills, teamwork, and excellence.",
    },
    // Schema برای کسب و کار محلی
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": "https://excel-pro-next.vercel.app/#localbusiness",
      name: "Excel Pro Football Academy",
      image: "https://excel-pro-next.vercel.app/images/academy-photo.jpg",
      priceRange: "$$", // تقریب قیمت‌گذاری خدمات
      telephone: "+1-416-123-4567",
      email: "info@excelproacademy.com",
      url: "https://excel-pro-next.vercel.app",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Soccer Street",
        addressLocality: "Toronto",
        addressRegion: "ON",
        postalCode: "M1M 1M1",
        addressCountry: "CA",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "43.6532", // موقعیت جغرافیایی واقعی خود را قرار دهید
        longitude: "-79.3832",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Saturday"],
          opens: "10:00",
          closes: "16:00",
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <main
        id="home-page"
        className="min-h-screen"
        aria-label="Home Page"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <Landing />

        <section className="sr-only">
          <h2>
            Excel Pro Football Academy - Toronto&apos;s Premier Soccer Training
          </h2>
          <p>
            Welcome to Excel Pro Football Academy, the largest Iranian-based
            soccer academy in Toronto. Founded by former Persepolis FC player
            Reza Abedian, we offer professional soccer training for youth aged 6
            to 18. Our programs focus on developing technical skills, teamwork,
            strategy, and athletic excellence both on and off the field.
          </p>
          <p>
            With over 500 students, 18 years of experience, 12 professional
            coaches, and 10 awards won, Excel Pro Academy has established itself
            as a leader in youth soccer development in Toronto.
          </p>
        </section>
      </main>
    </>
  );
}

export const revalidate = 3600;
