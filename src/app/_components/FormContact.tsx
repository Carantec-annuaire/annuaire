"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

import { Contact } from "~/server/queries";
type ClientContact = Omit<Contact, "id"> & { photo: File };

export default function FormContact({
  handleSubmit,
  contact = {
    prenom: "",
    nom: "",
    fonction: "",
    mail: "",
    mobile: "",
    fixe: "",
    photo: "",
  },
  type,
}) {
  const [previewUrl, setPreviewUrl] = useState(contact?.photo || null);
  const [form, setForm] = useState(contact);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setForm({ ...form, photo: file });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    handleSubmit(formData);
  };

  return (
    <div className="container mx-auto p-2">
      <form className="flex flex-col space-y-1" onSubmit={onSubmit}>
        <div className="relative mx-auto aspect-square w-1/2">
          <label
            htmlFor="file-input"
            className="flex h-full w-full cursor-pointer"
          >
            {previewUrl ? (
              <Image
                src={previewUrl}
                alt="Selected Image"
                fill
                sizes="150px"
                className="rounded object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border text-slate-600">
                Click to upload
              </div>
            )}
          </label>
          <input
            id="file-input"
            type="file"
            name="photo"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="prenom" className="text-sm">
            Prénom
          </label>
          <input
            type="text"
            name="prenom"
            value={form.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="nom" className="text-sm">
            Nom
          </label>
          <input
            type="text"
            name="nom"
            value={form.nom}
            onChange={handleChange}
            placeholder="Nom"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fonction" className="text-sm">
            Fonction
          </label>
          <input
            type="text"
            name="fonction"
            value={form.fonction}
            onChange={handleChange}
            placeholder="Fonction"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mail" className="text-sm">
            Email
          </label>
          <input
            type="email"
            name="mail"
            value={form.mail}
            onChange={handleChange}
            placeholder="Email"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="mobile" className="text-sm">
            Mobile
          </label>
          <input
            type="tel"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fixe" className="text-sm">
            Fixe
          </label>
          <input
            type="tel"
            name="fixe"
            value={form.fixe}
            onChange={handleChange}
            placeholder="Fixe"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded bg-slate-800 px-4 py-2 text-white"
        >
          {type}
        </button>
      </form>
    </div>
  );
}
