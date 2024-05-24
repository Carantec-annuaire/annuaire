"use server";
import BackButton from "~/app/_components/BackButton";
import FormContact from "~/app/_components/FormContact";
import { getContactById } from "~/server/queries";
import { handleContactDelete } from "~/server/actions";
import { redirect } from "next/navigation";
import DeleteButton from "~/app/_components/DeleteButton";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  //console.log(id);
  //const params = useParams() as { id: string };
  const originalContact = await getContactById(id);

  if (!originalContact) {
    redirect("/contact");
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">Modification</h1>
        <DeleteButton handleDelete={handleContactDelete} id={id} />
      </div>
      <FormContact contact={originalContact} type="Modifier" />
    </>
  );
}
