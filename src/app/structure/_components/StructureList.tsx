"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronRight, Search } from "lucide-react";

export default function StructureList({ structures }: any) {
  //console.log;
  const [search, setSearch] = useState("");
  structures = structures.filter((structure: any) => {
    return (
      structure.nom.toLowerCase().includes(search.toLowerCase()) ||
      structure.ville?.toLowerCase().includes(search.toLowerCase()) ||
      structure.adresse?.toLowerCase().includes(search.toLowerCase()) ||
      structure.description?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const router = useRouter();

  const sortedStructuresByName = structures.sort((a: any, b: any) => {
    return a.nom.localeCompare(b.nom);
  });

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
      {sortedStructuresByName.map((structure: any) => (
        <button
          key={structure.id}
          className="flex w-full flex-row items-center rounded-md border border-slate-200 bg-slate-200 p-1 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:bg-slate-100"
          onClick={() => {
            router.push(`/structure/${structure.id}`);
          }}
        >
          <div className="relative mr-2 h-16 w-16">
            <Image
              src={
                structure.photo && structure.photo !== "null"
                  ? structure.photo
                  : "/placeholder.svg"
              }
              alt={`${structure.nom}`}
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
            <span className="font-semibold">{structure.nom}</span>
            <span className="uppercase">{structure.ville}</span>
            <span className="uppercase text-slate-600">
              {structure.range_age}
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
