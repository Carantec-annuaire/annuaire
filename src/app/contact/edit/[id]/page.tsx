"use server";
import BackButton from "~/app/_components/BackButton";
import FormContact from "~/app/_components/FormContact";
import {
  deleteContact,
  Contact,
  getContactById,
  updateContact,
} from "~/server/queries";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Delete } from "lucide-react";
import DeleteButton from "~/app/_components/DeleteButton";
// Omit the id field from the Contact type and set the photo field to be a File type.
// This will allow us to upload a photo for the contact.
type ClientContact = Omit<Contact, "id"> & { photo: File };

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

  async function handleSubmit(formData: FormData) {
    "use server";

    const updatedContact = {
      prenom: formData.get("prenom") as string,
      nom: formData.get("nom") as string,
      fonction: formData.get("fonction") as string,
      mail: formData.get("mail") as string,
      mobile: formData.get("mobile") as string,
      fixe: formData.get("fixe") as string,
      photo: formData.get("photo") as File | string,
    };

    if (typeof updatedContact.photo !== "string") {
      // Save the file to /public/images/ folder
      const photoBuffer = Buffer.from(await updatedContact.photo.arrayBuffer());
      const photoUuid = uuidv4();
      const photoExtension = path.extname(updatedContact.photo.name);
      const photoFilename = `${photoUuid}${photoExtension}`;
      const photoPath = path.join(
        process.cwd(),
        "public/images",
        photoFilename,
      );

      fs.writeFileSync(photoPath, photoBuffer);
      await updateContact({
        ...updatedContact,
        photo: `/images/${photoFilename}`,
        id: id,
      });
    } else {
      await updateContact({
        ...updatedContact,
        photo: updatedContact.photo,
        id: id,
      });
    }

    revalidatePath("/contact");
    redirect("/contact");
  }

  async function handleDelete(test) {
    "use server";
    await deleteContact(id);
    revalidatePath("/contact");
    redirect("/contact");
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">Modification</h1>
        <DeleteButton handleDelete={handleDelete} />
      </div>
      <FormContact
        handleSubmit={handleSubmit}
        contact={originalContact}
        type="Modifier"
      />
    </>
  );
}
