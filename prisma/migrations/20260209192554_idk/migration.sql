/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `forcePrivate` on the `Settings` table. All the data in the column will be lost.
  - You are about to drop the column `showPrivateOption` on the `Settings` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "driveId" TEXT NOT NULL,
    "parentId" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Folder_driveId_fkey" FOREIGN KEY ("driveId") REFERENCES "Drive" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Folder_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Media" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "filename" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "ip" TEXT,
    "userId" TEXT,
    "transcodeStatus" TEXT NOT NULL DEFAULT 'not_required',
    "transcodeError" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "driveId" TEXT,
    "folderId" TEXT,
    CONSTRAINT "Media_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Media_driveId_fkey" FOREIGN KEY ("driveId") REFERENCES "Drive" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Media_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Media" ("createdAt", "driveId", "filename", "id", "ip", "mimeType", "originalName", "size", "transcodeError", "transcodeStatus", "userId") SELECT "createdAt", "driveId", "filename", "id", "ip", "mimeType", "originalName", "size", "transcodeError", "transcodeStatus", "userId" FROM "Media";
DROP TABLE "Media";
ALTER TABLE "new_Media" RENAME TO "Media";
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY DEFAULT 'default',
    "allowPublicUpload" BOOLEAN NOT NULL DEFAULT false,
    "allowRegistration" BOOLEAN NOT NULL DEFAULT false,
    "maxFileSize" BIGINT NOT NULL DEFAULT 104857600,
    "rateLimitWindow" INTEGER NOT NULL DEFAULT 10,
    "defaultCompression" TEXT NOT NULL DEFAULT 'balanced',
    "showNoCompression" BOOLEAN NOT NULL DEFAULT true,
    "smtpHost" TEXT,
    "smtpPort" INTEGER,
    "smtpUser" TEXT,
    "smtpPassword" TEXT,
    "smtpFrom" TEXT
);
INSERT INTO "new_Settings" ("allowPublicUpload", "allowRegistration", "defaultCompression", "id", "maxFileSize", "rateLimitWindow", "showNoCompression", "smtpFrom", "smtpHost", "smtpPassword", "smtpPort", "smtpUser") SELECT "allowPublicUpload", "allowRegistration", "defaultCompression", "id", "maxFileSize", "rateLimitWindow", "showNoCompression", "smtpFrom", "smtpHost", "smtpPassword", "smtpPort", "smtpUser" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
