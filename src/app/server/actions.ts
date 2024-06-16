"use server";

import prisma from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function getAllSalesPersons() {
  try {
    const salesPersons = await prisma.salesPerson.findMany();
    if (!salesPersons) {
      return [];
    }
    return salesPersons;
  } catch (e) {
    return [];
  }
}
export async function getAllRealEstates() {
  try {
    const realEstates = await prisma.realEstate.findMany();
    if (!realEstates) {
      return [];
    }
    return realEstates;
  } catch (e) {
    return [];
  }
}

export async function getCommission() {
  try {
    const commissions = await prisma.commission.findMany();
    if (!commissions) {
      return [];
    }
    return commissions;
  } catch (e) {
    return [];
  }
}

export async function getCommissionById(id: number) {
  try {
    const commission = await prisma.commission.findUnique({
      where: {
        id,
      },
    });
    if (!commission) {
      return [];
    }
    return commission;
  } catch (e) {
    return [];
  }
}

export async function addSalesPersons(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  try {
    await prisma.salesPerson.create({
      data: {
        name,
        email,
      },
    });
  } catch (e) {
    console.error(e);
  }
}
export async function addRealEstate(formData: FormData) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const price = parseFloat(formData.get("price") as string);
  try {
    await prisma.realEstate.create({
      data: {
        name,
        address,
        price,
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function createCommission(formData: FormData) {
  const salesPersonId = formData.get("salespersonid") as string;
  const rate = formData.get("rate") as string;
  const commissionId = await prisma.commission.findFirst({
    include: {
      salesPerson: true,
      realEstate: true,
    },
    where: {
      salesPersonId: parseInt(salesPersonId),
      realEstateId: 1,
    },
  });
  if (!commissionId) {
    console.error("Commission not found");
    return;
  } else {
    try {
      const amount = commissionId.realEstate.price * parseFloat(rate);

      console.log(commissionId.id, amount);
      await prisma.commission.upsert({
        where: {
          // in this case, the combination of salesPersonId and realEstateId
          id: commissionId.id,
          salesPersonId: parseInt(salesPersonId),
          realEstateId: 1,
        },
        create: {
          amount: amount,
          rate: parseFloat(rate),
          realEstateId: 1,
          salesPersonId: parseInt(salesPersonId),
        },
        update: {
          amount: amount,
          rate: parseFloat(rate),
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
export async function login(formData: FormData) {
  const userName = formData.get("username") as string;
  const password = formData.get("password") as string;
  if (
    userName === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const secret = new TextEncoder().encode(process.env.SECRET);
    const alg = "HS256";

    const token = await new SignJWT({ userName: userName, role: "admin" })
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);

    const cookieStore = cookies();
    if (typeof token === "string") {
      cookieStore.set("token", token, { sameSite: "strict" });
    }
  }
  console.error("Failed to set cookies");
  return undefined;
}
