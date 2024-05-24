"use client";
import { useCallback, useState } from "react";
import Image from "next/image";
import React from "react";
import { PlaceKit } from "@placekit/autocomplete-react";
import "@placekit/autocomplete-js/dist/placekit-autocomplete.css";
import { Structure } from "~/server/queries";
import { handleStructureSubmit, ClientContact } from "~/server/actions";

type StrucutreClient = Omit<Structure, "id"> & {
  photo?: File | string;
  id?: string;
};

export default function FormStructure({
  structure = {
    id: "",
    nom: "",
    photo: "",
    mail: "",
    range_age: "",
    description: "",
    telephone: "",
    adresse: "",
    ville: "",
    lat: "",
    lng: "",
  },
  type,
}: {
  structure?: StrucutreClient;
  type: string;
}) {
  const [previewUrl, setPreviewUrl] = useState(structure?.photo || null);
  const [form, setForm] = useState(structure);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  const handlePick = useCallback((value, item) => {
    setAddress(value); // Update the address state
    setForm((prevForm) => ({
      ...prevForm,
      adresse: value,
      lat: item.coordinates.lat,
      lng: item.coordinates.lng,
    }));

    console.log(item);

    setCity(item.city);
    setForm((prevForm) => ({
      ...prevForm,
      ville: item.city,
    }));
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setForm({ ...form, photo: file });
  };

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    await handleStructureSubmit(formData);
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
          <label htmlFor="telephone" className="text-sm">
            Téléphone
          </label>
          <input
            type="tel"
            name="telephone"
            value={form.telephone}
            onChange={handleChange}
            placeholder="Téléphone"
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
          <label htmlFor="adresse" className="text-sm">
            Adresse
          </label>
          <PlaceKit
            apiKey="pk_3Jd3rlb93CBJjHWGJzXXhocNfYIcWBqlGqoRf6s+V2s=" // replace with your actual API key
            id="address"
            name="address"
            defaultValue={`${form.adresse} ${form.ville}`}
            placeholder="Search places..."
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
            options={{
              maxResults: 5,
              types: ["street", "city"],
              countries: ["fr"], // set this to the countries you need
            }}
            onPick={handlePick} // Event handler to capture selected address
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="range_age" className="text-sm">
            Range Age
          </label>
          <input
            type="text"
            name="range_age"
            value={form.range_age}
            onChange={handleChange}
            placeholder="Range Age"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="mb-2 flex w-full flex-row space-x-1 rounded bg-slate-200 p-2 text-slate-800 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] outline-none"
            required
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
