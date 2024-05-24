"use server";
import BackButton from "~/app/_components/BackButton";
import FormStructure from "~/app/_components/FormStructure";

export default async function page() {
  return (
    <>
      <div className="flex flex-row items-center justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">Ajouter un contact</h1>
        <div className="h-12 w-12"></div>
      </div>
      <FormStructure type="Ajouter" />
    </>
  );
}
