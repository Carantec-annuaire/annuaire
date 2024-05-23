import Image from "next/image";
import { redirect } from "next/navigation";
import { getContactById } from "~/server/queries";
import BackButton from "~/app/_components/BackButton";
import Email from "~/app/_components/Email";
import EditButton from "~/app/_components/EditButton";
import Phone from "~/app/_components/Phone";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  //console.log(id);
  //const params = useParams() as { id: string };
  const contact = await getContactById(id);
  console.log(contact);

  if (!contact) {
    redirect("/contact");
  }

  return (
    <>
      <div className="flex flex-row items-end justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">
          {contact.prenom + " " + contact.nom}
        </h1>
        <EditButton path={"/contact/edit/" + id} />
      </div>

      <div className="flex flex-col items-start gap-y-1 p-2">
        <div className="relative flex aspect-square w-1/2 self-center p-2">
          <Image
            src={contact.photo ? contact.photo : "/placeholder.svg"}
            alt={`${contact.prenom} ${contact.nom}`}
            sizes="512px"
            priority={true}
            fill
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="self-center text-xl text-slate-600">
          {contact.fonction}
        </div>
        {contact.mail && <Email email={contact.mail} />}
        {contact.mobile && <Phone phone={contact.mobile} />}
        {contact.fixe && <Phone phone={contact.fixe} />}
        {/* agences */}
      </div>
    </>
  );
}
