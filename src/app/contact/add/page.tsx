export default async function AddContact() {
  return (
    <>
      <form
        className="flex flex-col space-y-1"
        action={async (formaData: FormData) => {
          "use server";
        }}
      >
        <div>
          <input type="file" name="photo" />
        </div>
        <input type="text" name="prenom" placeholder="Prénom" />
        <input type="text" name="nom" placeholder="Nom" />
        <input type="text" name="fonction" placeholder="Fonction" />
        <input type="email" name="mail" placeholder="Email" />
        <input type="tel" name="mobile" placeholder="Mobile" />
        <input type="tel" name="fixe" placeholder="Fixe" />
        <button type="submit">Ajouter</button>
      </form>
    </>
  );
}
