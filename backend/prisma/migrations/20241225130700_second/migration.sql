-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CREATED', 'COMPLETED', 'UNDERPREPRATION');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('CREATED', 'ASSIGNED', 'FINISHEDBYVENDOR', 'UNDERREVIEWBYTEAMMEMBER', 'REJECTEDBYTEAMMEMBER', 'UNDERREVIEWBYCLIENT', 'REJECTEDBYCLIENT', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SubTaskStatus" AS ENUM ('CREATED', 'FINISHEDBYVENDOR', 'UNDERREVIEWBYTEAMMEMBER', 'REJECTEDBYTEAMMEMBER', 'UNDERREVIEWBYCLIENT', 'REJECTEDBYCLIENT', 'COMPLETED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('CLIENT', 'TEAM_MEMBER', 'MANAGER', 'VENDOR');

-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "EventManager" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'MANAGER'
);

-- CreateTable
CREATE TABLE "Vendor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'VENDOR'
);

-- CreateTable
CREATE TABLE "TeamMember" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'TEAM_MEMBER'
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "number" BIGINT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'CLIENT'
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "clientId" INTEGER NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'CREATED',
    "managerId" INTEGER NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadLine" TIMESTAMP(3) NOT NULL,
    "updatedOn" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,
    "vendorId" INTEGER NOT NULL,
    "teammemberId" INTEGER NOT NULL,
    "status" "TaskStatus" NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadLine" TIMESTAMP(3) NOT NULL,
    "updatedOn" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SubTask" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "SubTaskStatus" NOT NULL,
    "taskId" INTEGER NOT NULL,
    "createdById" INTEGER NOT NULL,
    "createdByRole" "UserRole" NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deadLine" TIMESTAMP(3) NOT NULL,
    "updatedOn" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "SubTaskRequest" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    "requestedById" INTEGER NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "approvedById" INTEGER,
    "approvedByRole" "UserRole",
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewedOn" TIMESTAMP(3),
    "isMajor" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SubTaskRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventManager_id_key" ON "EventManager"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EventManager_email_key" ON "EventManager"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventManager_number_key" ON "EventManager"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_id_key" ON "Vendor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_email_key" ON "Vendor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Vendor_number_key" ON "Vendor"("number");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_id_key" ON "TeamMember"("id");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_email_key" ON "TeamMember"("email");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_number_key" ON "TeamMember"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Client_id_key" ON "Client"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Client_email_key" ON "Client"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Client_number_key" ON "Client"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Event_id_key" ON "Event"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Task_id_key" ON "Task"("id");

-- CreateIndex
CREATE UNIQUE INDEX "SubTask_id_key" ON "SubTask"("id");

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "EventManager"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_teammemberId_fkey" FOREIGN KEY ("teammemberId") REFERENCES "TeamMember"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTask" ADD CONSTRAINT "SubTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubTaskRequest" ADD CONSTRAINT "SubTaskRequest_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
