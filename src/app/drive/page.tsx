import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { QUERIES } from "~/server/db/querries";

export default async function DrivePage() {
  const session = await auth();
  if (!session.userId) redirect("/sign-in");

  const rootFolder = await QUERIES.getRootFolderForUser(session.userId);

  if (!rootFolder) {
    redirect("/drive/create-root-folder");
  }

  return redirect(`/f/${rootFolder.id}`);
}
