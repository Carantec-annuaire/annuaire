import "server-only";
import { db } from "./db";

import { activite, contact, structure , partenaire } from "./db/schema";

import { eq } from "drizzle-orm";

function getContentUrlFromGoogle(url: string) {
  if(!url) return url;
  const regex = /\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  if (match && match[1]) {
    return "https://lh3.googleusercontent.com/d/" + match[1];
  }
  if(url === "null") return null;
  return url;
}


//Contact
export type Contact = typeof contact.$inferInsert;

export async function getContacts() {
  const contacts = await db.query.contact.findMany() as Contact[];
  return contacts;
}

export async function getContactById(id: string) {
  const res = await db.query.contact.findFirst({ where: eq(contact.id, id) });
  return { ...res, photo: getContentUrlFromGoogle(res.photo) };
}

export async function upsertContact(myContact: Contact){
  await db.insert(contact).values(myContact).onConflictDoUpdate({target: contact.id, set: myContact});
}

export async function deleteContact(id: string){
  await db.delete(contact).where(eq(contact.id, id));
}


//Structure
export type Structure = typeof structure.$inferInsert;

export async function getStructures() {
  const structures = await db.query.structure.findMany();
  return structures;
}

export async function getStructureById(id: string) {
  const res = await db.query.structure.findFirst({ where: eq(structure.id, id) });
  //console.log(typeof res)
  return { ...res, photo: getContentUrlFromGoogle(res.photo) };
}

export async function upsertStructure(myStructure: any){
  await db.insert(structure).values(myStructure).onConflictDoUpdate({target: structure.id, set: myStructure});
}

export async function deleteStructure(id: string){
  await db.delete(structure).where(eq(structure.id, id));
}

//Partenaires
export type Partenaire = typeof partenaire.$inferInsert;

export async function getPartenaires() {
  const partenaires = await db.query.partenaire.findMany();
  return partenaires;
}

export async function getPartenaireById(id: string) {
  const res = await db.query.partenaire.findFirst({ where: eq(partenaire.id, id) });
  //console.log(typeof res)
  return { ...res, logo: getContentUrlFromGoogle(res.logo) };
}

export async function upsertPartenaire(myPartenaire: any){
  await db.insert(partenaire).values(myPartenaire).onConflictDoUpdate({target: partenaire.id, set: myPartenaire});
}

export async function deletePartenaire(id: string){
  await db.delete(partenaire).where(eq(partenaire.id, id));
}

//Activites
export type Activite = typeof activite.$inferInsert;

export async function getActivites() {
  const activites = await db.query.activite.findMany();
  return activites;
}

export async function getActiviteById(id: string) {
  const res = await db.query.activite.findFirst({ where: eq(activite.id, id) });
  //console.log(typeof res)
  return { ...res, logo: getContentUrlFromGoogle(res.logo) };
}

export async function upsertActivite(myActivite: any){
  await db.insert(activite).values(myActivite).onConflictDoUpdate({target: activite.id, set: myActivite});
}

export async function deleteActivite(id: string){
  await db.delete(activite).where(eq(activite.id, id));
}


