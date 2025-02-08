"use server";

import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { and, eq } from "drizzle-orm";
import { UTApi } from "uploadthing/server";
import { db } from "~/server/db";
import { files_table } from "~/server/db/schema";
import { redirect } from "next/navigation";

const utApi = new UTApi();

export async function deleteFile(fileId: number) {
  const session = await auth();
  if (!session.userId) throw new Error("Unauthorized");

  const [file] = await db
    .select()
    .from(files_table)
    .where(
      and(eq(files_table.id, fileId), eq(files_table.ownerId, session.userId)),
    );

  if (!file) throw new Error("File not found");

  // delete file from uploadthing
  const utResults = await utApi.deleteFiles([
    file.url.replace("https://utfs.io/f/", ""),
  ]);

  // delete file from database
  const dbResults = await db
    .delete(files_table)
    .where(eq(files_table.id, fileId));

  // force a refresh of the page
  const c = await cookies();
  c.set("force-refresh", JSON.stringify(Math.random()));

  console.log(utResults, dbResults);
  return { success: true };
}

export async function handleGetStarted() {
  const session = await auth();
  if (!session?.userId) {
    return redirect("/sign-in");
  }
  return redirect("/drive");
}
