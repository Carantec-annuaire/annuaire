"use server";
import BackButton from "~/app/_components/BackButton";
import FormContact from "~/app/_components/FormContact";
import { addContact, Contact } from "~/server/queries";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Omit the id field from the Contact type and set the photo field to be a File type.
// This will allow us to upload a photo for the contact.
type ClientContact = Omit<Contact, "id"> & { photo: File };

export default async function page() {
  async function handleSubmit(formData: FormData) {
    "use server";

    const contact = {
      prenom: formData.get("prenom") as string,
      nom: formData.get("nom") as string,
      fonction: formData.get("fonction") as string,
      mail: formData.get("mail") as string,
      mobile: formData.get("mobile") as string,
      fixe: formData.get("fixe") as string,
      photo: formData.get("photo") as File,
    };

    // Save the file to /public/images/ folder
    const photoBuffer = Buffer.from(await contact.photo.arrayBuffer());
    const photoUuid = uuidv4();
    const photoExtension = path.extname(contact.photo.name);
    const photoFilename = `${photoUuid}${photoExtension}`;
    const photoPath = path.join(process.cwd(), "public/images", photoFilename);

    fs.writeFileSync(photoPath, photoBuffer);

    // Save contact to the database
    await addContact({
      ...contact,
      photo: `/images/${photoFilename}`,
      id: uuidv4(),
    });

    revalidatePath("/contacts");
    redirect("/contacts");
  }

  return (
    <>
      <div className="flex flex-row items-center justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">Ajouter un contact</h1>
        <div className="h-12 w-12"></div>
      </div>
      <FormContact handleSubmit={handleSubmit} type="Ajouter" />
    </>
  );
}
