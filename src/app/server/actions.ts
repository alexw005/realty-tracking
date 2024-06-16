"use server";

import prisma from "@/lib/db";
import { SignJWT } from "jose";
import { cookies } from "next/headers";

export async function addSalesPersons(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  await prisma.salesPerson.create({
    data: {
      name,
      email,
    },
  });
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
