"use server";
import BackButton from "~/app/_components/BackButton";
import FormActivite from "~/app/_components/FormActivite";
import FormStructure from "~/app/_components/FormStructure";

export default async function page() {
  return (
    <>
      <div className="flex flex-row items-center justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">
          Ajouter une Activité
        </h1>
        <div className="h-12 w-12"></div>
      </div>
      <FormActivite type="Ajouter" />
    </>
  );
}
