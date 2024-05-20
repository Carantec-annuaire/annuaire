import "server-only";
import { db } from "./db";
import { contact } from "./db/schema";
import { eq } from "drizzle-orm";

export async function getContacts() {
  const contacts = await db.query.contact.findMany();
  return contacts;
}

export async function getContactById(id: string) {
  const res = await db.query.contact.findFirst({ where: eq(contact.id, id) });
  //console.log(typeof res)
  const res2 = { ...res, photo: getPhoto(res) };

  function getPhoto(contact: any) {
    if (contact.photo !== null) {
      const regex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = contact.photo.match(regex);
      if (match && match[1]) {
        return "https://lh3.googleusercontent.com/d/" + match[1];
      }
    }
    return "/placeholder.svg";
  }
  return res2;
}