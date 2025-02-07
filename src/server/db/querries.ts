import "server-only";

import {
  files_table as filesSchema,
  folders_table as foldersSchema,
} from "~/server/db/schema";
import { db } from "~/server/db";
import { eq } from "drizzle-orm";

export const QUERIES = {
  getFiles: (folderId: number) => {
    return db
      .select()
      .from(filesSchema)
      .where(eq(filesSchema.parent, folderId));
  },

  getFolders: (folderId: number) => {
    return db
      .select()
      .from(foldersSchema)
      .where(eq(foldersSchema.parent, folderId));
  },

  getAllParentsForFolder: async (folderId: number) => {
    const parents = [];
    let currentId: number | null = folderId;
    while (currentId !== null) {
      const folder = await db
        .selectDistinct()
        .from(foldersSchema)
        .where(eq(foldersSchema.id, currentId));

      if (!folder[0]) {
        throw new Error("Parent folder not found");
      }

      parents.unshift(folder[0]);
      currentId = folder[0]?.parent;
    }

    return parents;
  },
};
