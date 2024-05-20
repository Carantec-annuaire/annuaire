"use client";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

const AddButton = ({ path }: { path: string }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`${path}/add`);
  };

  return (
    <button
      className="ml-2 flex h-12 w-12 items-center justify-center rounded bg-green-400 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60"
      onClick={handleClick}
    >
      <Plus />
    </button>
  );
};

export default AddButton;
