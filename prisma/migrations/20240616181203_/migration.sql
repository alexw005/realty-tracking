/*
  Warnings:

  - A unique constraint covering the columns `[salesPersonId,realEstateId]` on the table `commission` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "commission_salesPersonId_realEstateId_key" ON "commission"("salesPersonId", "realEstateId");
