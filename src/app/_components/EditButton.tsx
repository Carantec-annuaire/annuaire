"use client";
import { useRouter } from "next/navigation";
import { Pen } from "lucide-react";

const EditButton = ({ path }: { path: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${path}/edit`);
  };

  return (
    <button
      className="flex h-12 w-12 items-center justify-center rounded bg-yellow-500 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60"
      onClick={handleClick}
    >
      <Pen />
    </button>
  );
};

export default EditButton;
