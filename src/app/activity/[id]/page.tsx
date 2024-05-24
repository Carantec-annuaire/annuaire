import Image from "next/image";
import { redirect } from "next/navigation";
import { getActiviteById } from "~/server/queries";
import BackButton from "~/app/_components/BackButton";
import Email from "~/app/_components/Email";
import EditButton from "~/app/_components/EditButton";
import Phone from "~/app/_components/Phone";
import { ArrowUpRight } from "lucide-react";

export default async function Page({
  params: { id },
}: {
  params: { id: string };
}) {
  //console.log(id);
  //const params = useParams() as { id: string };
  const activite = await getActiviteById(id);

  if (!activite) {
    redirect("/activite");
  }

  return (
    <>
      <div className="flex flex-row items-end justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">{activite.nom}</h1>
        <EditButton path={"/activity/edit/" + id} />
      </div>

      <div className="flex flex-col items-start gap-y-1 p-2">
        <div className="relative flex aspect-square w-1/2 self-center p-2">
          <Image
            src={activite.logo ? activite.logo : "/placeholder.svg"}
            alt={`${activite.nom}`}
            sizes="512px"
            priority={true}
            fill
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="self-center text-xl text-slate-600">
          {activite.activite}
        </div>
        <div className="text-xl text-slate-600">{activite.ville}</div>
        <div className="mb-4 text-xl text-slate-600">{activite.domaine}</div>

        {activite.mail && <Email email={activite.mail} />}
        {activite.telephone && <Phone phone={activite.telephone} />}

        {activite.site && (
          <a
            href={activite.site}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            {activite.site} <ArrowUpRight className="mb-2 h-4 w-4" />
          </a>
        )}

        <div className="mt-4">{activite.commentaire}</div>
        {/* agences */}
      </div>
    </>
  );
}
