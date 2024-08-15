"use server";

import prisma from "@/lib/db";
import { checkIfTokenIsValid } from "@/utils";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export async function getAllCommissions() {
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

export async function getCommissionByRealEstateId(realestateId: number) {
  try {
    const commissions = await prisma.commission.findMany({
      where: {
        realEstateId: realestateId,
      },
      include: {
        salesPerson: true,
        realEstate: true,
      },
    });
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
  let salesPerson;
  try {
    salesPerson = await prisma.salesPerson.create({
      data: {
        name,
        email,
      },
    });
  } catch (e) {
    console.error(e);
  }
  if (salesPerson) {
    redirect("/dashboard");
  }
}
export async function addRealEstate(formData: FormData) {
  const name = formData.get("name") as string;
  const address = formData.get("address") as string;
  const price = parseFloat(formData.get("price") as string);
  let realEstate;
  try {
    realEstate = await prisma.realEstate.create({
      data: {
        name,
        address,
        price,
      },
    });
  } catch (e) {
    console.error(e);
  }
  if (realEstate) {
    redirect("/dashboard");
  }
}

export async function createCommission(formData: FormData) {
  const realEstateId = formData.get("realEstateId") as string;
  const price = parseFloat(formData.get("price") as string);
  const salesPersonId = formData.get("salesPersonId") as string;
  const rate = parseFloat(formData.get("percentage") as string) / 100;
  const commission = await prisma.commission.findFirst({
    include: {
      salesPerson: true,
      realEstate: true,
    },
    where: {
      salesPersonId: parseInt(salesPersonId),
      realEstateId: parseInt(realEstateId),
    },
  });
  if (!commission) {
    console.error("Commission not found");
  }
  try {
    const amount = price * rate; //commission.realEstate.price * rate;
    await prisma.commission.upsert({
      where: {
        // in this case, the combination of salesPersonId and realEstateId
        salesPersonId_realEstateId: {
          salesPersonId: parseInt(salesPersonId),
          realEstateId: parseInt(realEstateId),
        },
      },
      create: {
        amount: amount,
        rate: rate,
        realEstateId: parseInt(realEstateId),
        salesPersonId: parseInt(salesPersonId),
      },
      update: {
        amount: amount,
        rate: rate,
      },
    });
  } catch (e) {
    console.error(e);
  }
  if (realEstateId) {
    redirect(`/dashboard?realestateId=${realEstateId}`);
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
    cookieStore.set("token", token, { domain: process.env.BASE_URL, secure: true, sameSite: "none" });
    if (await checkIfTokenIsValid(cookieStore.get('token'))) {
      redirect("/dashboard");
    }
  }
  console.error("Failed to set cookies");
}
