-- CreateTable
CREATE TABLE "salesPerson" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "realEstate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "commission" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rate" REAL NOT NULL,
    "amount" REAL NOT NULL,
    "salesPersonId" INTEGER NOT NULL,
    "realEstateId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "commission_salesPersonId_fkey" FOREIGN KEY ("salesPersonId") REFERENCES "salesPerson" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "commission_realEstateId_fkey" FOREIGN KEY ("realEstateId") REFERENCES "realEstate" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "salesPerson_email_key" ON "salesPerson"("email");

-- CreateIndex
CREATE INDEX "commission_salesPersonId_realEstateId_idx" ON "commission"("salesPersonId", "realEstateId");
