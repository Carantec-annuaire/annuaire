import "~/styles/globals.css";
import 'leaflet/dist/leaflet.css';

import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import Navlink from "./_components/Navlink";

export const metadata = {
  title: "annuaire",
  description: "Annuaire jeunesse carantec",
  icons: [{ rel: "icon", url: "/dribbble.svg" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} no-scrollbar text-slate-800`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/places.js@1.19.0/dist/cdn/places.min.css"
        />
      </head>
      <body className="bg-slate-100">
        <nav className="fixed bottom-0 z-10 flex w-full flex-row justify-center bg-slate-100 p-2 shadow-[0_-1px_1px_0_rgba(71,85,105,0.37)]">
          <Link className="flex flex-row items-center " href="/contact">
            <img
              src="/dribbble.svg"
              alt="Home"
              className="hidden h-10 w-10" // Using Tailwind for sizing
            />
          </Link>
          <Navlink
            text={"Contacts"}
            href={"/contact"}
            iconsrc={"/users.svg"}
            isActive={false}
          />
          <Navlink
            text="Structures"
            href="/structure"
            iconsrc="/home.svg"
            isActive={false}
          />
          <Navlink
            text="Partenaires"
            href="/partner"
            iconsrc="/heart-handshake.svg"
            isActive={false}
          />
          <Navlink
            text="Activités"
            href="/activity"
            iconsrc="/star.svg"
            isActive={false}
          />
          <Navlink
            text="Carte"
            href="/map"
            iconsrc="/map.svg"
            isActive={false}
          />
        </nav>
        <main className="mb-20">{children}</main>
      </body>
    </html>
  );
}
