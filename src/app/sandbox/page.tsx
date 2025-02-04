import { db } from "~/server/db";
import { mockFiles, mockFolders } from "~/lib/mock-data";
import { files } from "~/server/db/schema";
import { folders } from "~/server/db/schema";

export default function SandboxPage() {
  return (
    <div className="flex flex-col gap-4">
      Seed Function{" "}
      <form
        action={async () => {
          "use server";

          const fileInsert = await db.insert(files).values(
            mockFiles.map((file, index) => ({
              id: index + 1,
              name: file.name,
              size: 5000,
              parent: (index % 3) + 1,
            })),
          );
          const folderInsert = await db.insert(folders).values(
            mockFolders.map((folder, index) => ({
              id: index + 1,
              name: folder.name,
              parent: index !== 0 ? 1 : null,
            })),
          );

          console.log(fileInsert, folderInsert);
        }}
      >
        <button type="submit">Seed</button>
      </form>
    </div>
  );
}
