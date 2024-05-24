"use server";
import BackButton from "~/app/_components/BackButton";
import FormContact from "~/app/_components/FormContact";
import { getActiviteById, getStructureById } from "~/server/queries";
import {
  handleActivityDelete,
  handleContactDelete,
  handleStructureDelete,
} from "~/server/actions";
import { redirect } from "next/navigation";
import DeleteButton from "~/app/_components/DeleteButton";
import FormStructure from "~/app/_components/FormStructure";
import FormActivite from "~/app/_components/FormActivite";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  //console.log(id);
  //const params = useParams() as { id: string };
  const originalContact = await getActiviteById(id);

  if (!originalContact) {
    redirect("/contact");
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">Modification</h1>
        <DeleteButton handleDelete={handleActivityDelete} id={id} />
      </div>
      <FormActivite activite={originalContact} type="Modifier" />
    </>
  );
}
