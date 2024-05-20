"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      className="flex h-12 w-12 items-center justify-center rounded bg-slate-800 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60"
      onClick={() => router.back()}
    >
      <ChevronLeft />
    </button>
  );
};

export default BackButton;
