-- DropForeignKey
ALTER TABLE "TeamMember" DROP CONSTRAINT "TeamMember_eventId_fkey";

-- AlterTable
ALTER TABLE "TeamMember" ALTER COLUMN "eventId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
