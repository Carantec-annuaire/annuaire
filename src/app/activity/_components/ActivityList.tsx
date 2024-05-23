"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Search } from "lucide-react";

export default function ActivityList({ activites }: any) {
    //console.log;
    const [search, setSearch] = useState("");
    activites = activites.filter((activite: any) => {
      return (
        activite.nom.toLowerCase().includes(search.toLowerCase()) ||
        activite.domaine.toLowerCase().includes(search.toLowerCase()) ||
        activite.activite.toLowerCase().includes(search.toLowerCase()) ||
        activite.ville?.toLowerCase().includes(search.toLowerCase())
      );
    });

    const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-y-1 p-2">
      <div className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-1 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)]">
        <button className="rounded bg-pink-600 p-1 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-75">
          <Search />
        </button>
        <input
          className="w-full bg-transparent outline-none"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {activites.map((activite: any) => (
        <button
          key={activite.id}
          className="flex w-full flex-row items-center rounded-md border border-slate-200 bg-slate-200 p-1 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:bg-slate-100"
          onClick={() => {
            router.push(`/activity/${activite.id}`);
          }}
        >
          <div className="relative mr-2 h-16 w-16">
            <Image
              src={activite.logo}
              alt={`${activite.prenom} ${activite.nom}`}
              sizes="64px"
              priority={true}
              fill
              className="rounded"
              style={{
                objectFit: "cover",
              }}
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="font-semibold">
              {activite.nom}
            </span>
            <span className="uppercase text-slate-600">
              {activite.ville}
            </span>
          </div>
          <div className="ml-auto p-2 font-medium">
            <ChevronRight />
          </div>
        </button>
      ))}
    </div>
  );
}