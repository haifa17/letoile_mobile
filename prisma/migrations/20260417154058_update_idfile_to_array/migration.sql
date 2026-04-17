/*
  Warnings:

  - The `idFileUrl` column on the `FormSubmission` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "FormSubmission" DROP COLUMN "idFileUrl",
ADD COLUMN     "idFileUrl" TEXT[];
