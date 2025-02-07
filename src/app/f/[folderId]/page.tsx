import {
  getFiles,
  getFolders,
  getAllParentsForFolder,
} from "~/server/db/querries";
import DriveContents from "~/app/drive-contents";

export default async function GoogleDriveClone(props: {
  params: Promise<{ folderId: string }>;
}) {
  const params = await props.params;

  const parsedFolderId = parseInt(params.folderId);
  if (isNaN(parsedFolderId)) {
    return <div>Invalid folder ID</div>;
  }

  const [files, folders, parents] = await Promise.all([
    getFiles(parsedFolderId),
    getFolders(parsedFolderId),
    getAllParentsForFolder(parsedFolderId),
  ]);

  return <DriveContents files={files} folders={folders} parents={parents} />;
}
