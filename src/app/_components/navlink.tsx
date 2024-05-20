"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function navlink({
  text,
  href,
  iconsrc,
}: {
  text: string;
  href: string;
  iconsrc: string;
  isActive?: boolean;
}) {
  const path = usePathname();
  return (
    <Link
      className={`flex w-1/5 flex-col items-center rounded px-1 py-1 ${path === href ? "bg-slate-200 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)]" : ""}`}
      href={href}
    >
      <img
        src={iconsrc}
        alt="Home"
        className="m-1 h-4 w-4" // Using Tailwind for sizing
      />
      <div className="text-stale-800 text-xs">{text}</div>
    </Link>
  );
}
