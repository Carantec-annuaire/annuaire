"use client";
import { Trash2 } from "lucide-react";

const DeleteButton = ({ handleDelete, id }) => {
  return (
    <button
      className="flex h-12 w-12 items-center justify-center rounded bg-pink-600 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60"
      type="submit"
      onClick={() => handleDelete(id)}
    >
      <Trash2 />
    </button>
  );
};

export default DeleteButton;
