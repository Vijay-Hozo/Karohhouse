import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { SmoothScroll } from "@/components/fx/SmoothScroll";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Karoh House | Middle Eastern Fragrance Distribution",
  description:
    "Karoh House distributes authentic Middle Eastern fragrance brands such as Lattafa, Afnan, Armaf and Rasasi to wholesale buyers worldwide, powered by an AI layer for compliance, discovery and outreach.",
  keywords: [
    "Arabian perfume wholesale",
    "Middle Eastern fragrance distributor",
    "Lattafa wholesale",
    "Afnan distributor",
    "Armaf wholesale",
    "Rasasi distributor",
    "Dubai perfume export",
  ],
  openGraph: {
    title: "Karoh House | Middle Eastern Fragrance Distribution",
    description:
      "Authentic Arabian fragrance brands, wholesale pricing, and an AI platform that makes market entry repeatable.",
    url: "https://karoh.house",
    siteName: "Karoh House",
    type: "website",
  },
};

const themeScript = `
(function(){try{var t=localStorage.getItem('karoh-theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.setAttribute('data-theme',t)}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <SmoothScroll>
            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
