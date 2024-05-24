import Image from "next/image";
import { redirect } from "next/navigation";
import { getStructureById } from "~/server/queries";
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
  const structure = await getStructureById(id);

  if (!structure) {
    redirect("/structure");
  }

  return (
    <>
      <div className="flex flex-row items-end justify-between p-2">
        <BackButton />
        <h1 className="text-center text-2xl font-bold ">{structure.nom}</h1>
        <EditButton path={"/structure/edit/" + id} />
      </div>

      <div className="flex flex-col items-start gap-y-1 p-2">
        <div className="relative flex aspect-square w-1/2 self-center p-2">
          <Image
            src={structure.photo ? structure.photo : "/placeholder.svg"}
            alt={`${structure.nom}`}
            sizes="512px"
            priority={true}
            fill
            className="rounded"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="self-center text-xl text-slate-600">
          {structure.range_age}
        </div>
        <div className="text-xl font-semibold text-slate-600">
          {structure.ville}
        </div>
        <div className="text-xl text-slate-600">{structure.description}</div>
        {structure.mail && <Email email={structure.mail} />}
        {structure.telephone && <Phone phone={structure.telephone} />}
        {/* agences */}
        <div className="self-center text-xl text-slate-600">
          {structure.adresse}
        </div>
      </div>
    </>
  );
}
