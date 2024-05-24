"use server";
import { upsertContact, Contact, deleteContact, upsertStructure, Structure, deleteStructure, Partenaire, upsertPartenaire, deletePartenaire, Activite, upsertActivite, deleteActivite } from "~/server/queries";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type ClientContact = Omit<Contact, "id"> & { photo?: File | string, id?: string };

//helper to save photo to public/images
async function savePhoto(photo : File | string){
    if (typeof photo === "string") {
      return photo;
    }

    const photoBuffer = Buffer.from(await photo.arrayBuffer());
    const photoUuid = uuidv4();
    const photoExtension = path.extname(photo.name);
    const photoFilename = `${photoUuid}${photoExtension}`;
    const photoPath = path.join(
      process.cwd(),
      "public/images",
      photoFilename,
    );

    fs.writeFileSync(photoPath, photoBuffer);

    return `/images/${photoFilename}`;
}

//allow to add a contact or update it Contact
export async function handleContactSubmit(formData: FormData) {
    "use server";

    const contact : ClientContact = {
      id: formData.get("id") as string,
      prenom: formData.get("prenom") as string,
      nom: formData.get("nom") as string,
      fonction: formData.get("fonction") as string,
      mail: formData.get("mail") as string,
      mobile: formData.get("mobile") as string,
      fixe: formData.get("fixe") as string,
      photo: formData.get("photo") as string,
    };

    // Save the file to /public/images/ folder
    const photoPath = await savePhoto(contact.photo);

    // Save contact to the database
    await upsertContact({
      ...contact,
      photo: photoPath,
      id: contact.id ? contact.id : uuidv4(),
    });

    revalidatePath("/contact");
    redirect("/contact");
}

export async function handleContactDelete(id: string) {
  "use server";

  await deleteContact(id);
  revalidatePath("/contact");
  redirect("/contact");
}

type StrucutreClient = Omit<Structure, "id"> & { photo?: File | string, id?: string };

//allow to add a Structure or update Structure
export async function handleStructureSubmit(formData: FormData) {
    "use server";

    const structure : StrucutreClient = {
      id: formData.get("id") as string,
      nom: formData.get("nom") as string,
      ville: formData.get("ville") as string,
      photo: formData.get("photo") as string,
      mail: formData.get("mail") as string,
      range_age: formData.get("range_age") as string,
      description: formData.get("description") as string,
      telephone: formData.get("telephone") as string,
      adresse: formData.get("adresse") as string,
      lat: formData.get("lat") as string,
      lng: formData.get("lng") as string,
    };

    // Save the file to /public/images/ folder
    const photoPath = await savePhoto(structure.photo);

    // Save contact to the database
    await upsertStructure({
      ...structure,
      photo: photoPath,
      id: structure.id ? structure.id : uuidv4(),
    });

    revalidatePath("/structure");
    redirect("/structure");
}

export async function handleStructureDelete(id: string) {
  "use server";

  await deleteStructure(id);
  revalidatePath("/structure");
  redirect("/structure");
}

//allow to add a Partenaire or update Partenaire

type PartenaireClient = Omit<Partenaire, "id"> & { logo?: File | string, id?: string };
export async function handlePartenaireSubmit(formData: FormData) {
    "server";

    const partenaire : PartenaireClient = {
      id: formData.get("id") as string,
      nom: formData.get("nom") as string,
      nomDetails: formData.get("nomDetails") as string,
      contact: formData.get("contact") as string,
      telephone: formData.get("telephone") as string,
      mail: formData.get("mail") as string,
      logo: formData.get("logo") as string,
      adresse: formData.get("addresse") as string,
      ville: formData.get("ville") as string,
      site: formData.get("site") as string,
      champsAction: formData.get("champsAction") as string,
      lat: formData.get("lat") as string,
      lng: formData.get("lng") as string,
    };

    // Save the file to /public/images/ folder
    const logoPath = await savePhoto(partenaire.logo);

    // Save contact to the database
    await upsertPartenaire({
      ...partenaire,
      logo: logoPath,
      id: partenaire.id ? partenaire.id : uuidv4(),
    });

    revalidatePath("/partenaire");
    redirect("/partenaire");
}

async function handleDeletePartenaire(id: string) {
  "server";

  await deletePartenaire(id);
  revalidatePath("/partenaire");
  redirect("/partenaire");
}

//allow to add an Activity and update it
type ActivityClient = Omit<Activite, "id"> & { logo?: File | string, id?: string };
export async function handleActivitySubmit(formData: FormData) {
    "server";

    const activity : ActivityClient = {
      id: formData.get("id") as string,
      nom: formData.get("nom") as string,
      logo: formData.get("logo") as string,
      activite: formData.get("activite") as string,
      domaine: formData.get("domaine") as string,
      site: formData.get("site") as string,
      mail: formData.get("mail") as string,
      telephone: formData.get("telephone") as string,
      commentaire: formData.get("commentaire") as string,
      adresse: formData.get("adresse") as string,
      ville: formData.get("ville") as string,
      lat: formData.get("lat") as string,
      lng: formData.get("lng") as string,
    };

    // Save the file to /public/images/ folder
    const logoPath = await savePhoto(activity.logo);

    // Save contact to the database
    await upsertActivite({
      ...activity,
      logo: logoPath,
      id: activity.id ? activity : uuidv4(),
    });

    revalidatePath("/activity");
    redirect("/activity");
}


export async function handleActivityDelete(id: string) {
  "server";

  await deleteActivite(id);
  revalidatePath("/activity");
  redirect("/activity");
}