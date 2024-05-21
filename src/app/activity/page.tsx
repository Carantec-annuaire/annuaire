import { getActivites } from "~/server/queries";
import ActivityList from "./_components/ActivityList";
import AddButton from "../_components/AddButton";
import { LogOut } from "lucide-react";

export default async function ActivityPage() {
  const activites = (await getActivites()).map((activite) => ({
    ...activite,
    logo: getLogo(activite),
  }));

  function getLogo(activite: any) {
    if (activite.logo !== null) {
      const regex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = activite.logo.match(regex);
      if (match && match[1]) {
        return "https://lh3.googleusercontent.com/d/" + match[1];
      }
    }
    return "/placeholder.svg";
  }

  return (
    <>
      <div className="flex flex-row items-end p-2">
        <h1 className="flex-grow text-left text-3xl font-bold">Activités</h1>
        <button className="flex h-12 w-12 items-center justify-center rounded bg-pink-600 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60">
          <LogOut />
        </button>
        <AddButton path="/contact" />
      </div>
      <ActivityList activites={activites} />
    </>
  );
}