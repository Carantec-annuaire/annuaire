import Image from "next/image";
import { redirect } from "next/navigation";
import { getPartenaireById } from "~/server/queries";
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
  const partenaire = await getPartenaireById(id);

  if (!partenaire) {
    redirect("/partner");
  }

  return (
    <>
      <div className="flex flex-row items-end justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">{partenaire.nom}</h1>
        <EditButton path={"/partner/edit/" + id} />
      </div>

      <div className="flex flex-col items-start gap-y-1 p-2">
        <div className="relative flex aspect-square w-1/2 self-center p-2">
          <Image
            src={partenaire.logo ? partenaire.logo : "/placeholder.svg"}
            alt={`${partenaire.nom} ${partenaire.nomDetails}`}
            sizes="512px"
            priority={true}
            fill
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="self-center text-xl text-slate-600">
          {partenaire.contact}
        </div>
        <div className="text-xl text-slate-600">{partenaire.champsAction}</div>
        <div className="mb-4 text-xl text-slate-600">{partenaire.adresse}</div>

        {partenaire.mail && <Email email={partenaire.mail} />}
        {partenaire.telephone && <Phone phone={partenaire.telephone} />}

        {partenaire.site && (
          <a
            href={partenaire.site}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center"
          >
            {partenaire.site} <ArrowUpRight className="mb-2 h-4 w-4" />
          </a>
        )}

        {/* <div className="mt-4">{partenaire.contact}</div> */}
        {/* agences */}
      </div>
    </>
  );
}
