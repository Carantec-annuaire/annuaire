import { redirect } from "next/navigation";

export default function HomePage() {
  // Redirect to /contact
  redirect("/contact");

  // This return is just a placeholder and will not be rendered
  return null;
}
