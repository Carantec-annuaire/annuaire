import { MessageCircle, Phone as PhoneIcon } from "lucide-react";
export default function Phone({ phone }: { phone: string }) {
  const showSMS = phone.startsWith("06") || phone.startsWith("07");
  return (
    <div className="flex w-full flex-row items-center space-x-2 rounded bg-slate-200 p-1 shadow-[0_1px_1px_0_rgba(71,85,105,0.37)]">
      <div className="flex-grow text-xl text-slate-600">{phone}</div>
      <a
        href={`tel:${phone}`}
        className="flex h-12 w-12 items-center justify-center rounded bg-slate-800 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60"
      >
        <PhoneIcon />
      </a>
      {/* do the same to sms */}
      {showSMS && (
        <a
          href={`sms:${phone}`}
          className="flex h-12 w-12 items-center justify-center rounded bg-slate-800 text-white shadow-[0_1px_1px_0_rgba(71,85,105,0.37)] duration-150 ease-in-out hover:opacity-60"
        >
          <MessageCircle />
        </a>
      )}
    </div>
  );
}
