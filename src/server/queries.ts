import "server-only";
import { db } from "./db";

import { activite, contact, structure , partenaire } from "./db/schema";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";


export async function getContacts() {
  const contacts = await db.query.contact.findMany() as typeof contact.$inferInsert[];
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
    return contact.photo;
  }
  return res2;
}

export async function getActivites() {
  const activites = await db.query.activite.findMany();
  return activites;
}

export async function getActiviteById(id: string) {
  const res = await db.query.activite.findFirst({ where: eq(activite.id, id) });
  //console.log(typeof res)
  const res2 = { ...res, logo: getLogo(res) };

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
  return res2;
}

export async function getPartenaires() {
  const partenaires = await db.query.partenaire.findMany();
  return partenaires;
}

export async function getPartenaireById(id: string) {
  const res = await db.query.partenaire.findFirst({ where: eq(partenaire.id, id) });
  //console.log(typeof res)
  const res2 = { ...res, logo: getLogo(res) };

  function getLogo(partenaire: any) {
    if (partenaire.logo !== null) {
      const regex = /\/d\/([a-zA-Z0-9_-]+)/;
      const match = partenaire.logo.match(regex);
      if (match && match[1]) {
        return "https://lh3.googleusercontent.com/d/" + match[1];
      }
    }
    return "/placeholder.svg";
  }
  return res2;
}


export async function getStructures() {
  const structures = await db.query.structure.findMany();
  return structures;
}

export async function getStructureById(id: string) {
  const res = await db.query.structure.findFirst({ where: eq(structure.id, id) });
  //console.log(typeof res)
  const res2 = { ...res, photo: getPhoto(res) };

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
  return res2;
}