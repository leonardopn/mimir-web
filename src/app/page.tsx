import { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";

export default function Home() {
	redirect("/books", RedirectType.replace);
}
