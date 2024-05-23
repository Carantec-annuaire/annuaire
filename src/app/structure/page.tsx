import { getStructures } from "~/server/queries";
import StructureList from "./_components/StructureList";
import AddButton from "../_components/AddButton";
import { LogOut } from "lucide-react";

export default async function StructurePage() {
  const structures = (await getStructures()).map((structure) => ({
    ...structure,
    photo: getPhoto(structure),
  }));

  function getPhoto(structure: any) {
    if (structure.photo !== null) {
      const regex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = structure.photo.match(regex);
      if (match && match[1]) {
        return "https://lh3.googleusercontent.com/d/" + match[1];
      }
    }
    return "/placeholder.svg";
  }

  return (
    <>
      <div className="flex flex-row items-end p-2">
        <h1 className="flex-grow text-left text-3xl font-bold">Structures</h1>
        <button className="flex h-12 w-12 items-center justify-center rounded bg-pink-600 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60">
          <LogOut />
        </button>
        <AddButton path="/structure" />
      </div>
      <StructureList structures={structures} />
    </>
  );
}


