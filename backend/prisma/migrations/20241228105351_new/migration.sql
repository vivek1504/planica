/*
  Warnings:

  - You are about to drop the column `approvedById` on the `SubTaskRequest` table. All the data in the column will be lost.
  - You are about to drop the column `approvedByRole` on the `SubTaskRequest` table. All the data in the column will be lost.
  - You are about to drop the column `teammemberId` on the `Task` table. All the data in the column will be lost.
  - Added the required column `deadline` to the `SubTaskRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamMemberId` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_teammemberId_fkey";

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "status" SET DEFAULT 'CREATED';

-- AlterTable
ALTER TABLE "SubTaskRequest" DROP COLUMN "approvedById",
DROP COLUMN "approvedByRole",
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "teammemberId",
ADD COLUMN     "approvedByVendor" BOOLEAN DEFAULT false,
ADD COLUMN     "teamMemberId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "TeamMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
