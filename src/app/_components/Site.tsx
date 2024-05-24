import { Link } from "lucide-react";
export default function Site({ url }: { url: string }) {
  return (
    <div className="flex w-full flex-row items-center rounded bg-slate-200 p-1 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)]">
      <div className="flex-grow text-xl text-slate-600">{url}</div>
      <a
        href={url}
        className="flex h-12 w-12 items-center justify-center rounded bg-slate-800 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60"
      >
        <Link />
      </a>
    </div>
  );
}
