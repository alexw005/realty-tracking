import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

async function isAuth(req: NextRequest) {
  const nextPath = req.nextUrl.pathname;
  const token = req.cookies.get("token");

  if (token && typeof token.value === "string") {
    const secret = new TextEncoder().encode(process.env.SECRET);
    const { payload, protectedHeader } = await jwtVerify(token.value, secret);
    if (!payload && nextPath !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    } else if (payload["role"] === "admin") {
      return NextResponse.next();
    }
  } else if (nextPath !== "/login")
    return NextResponse.redirect(new URL("/login", req.url));
}

export default async function middleware(req: NextRequest) {
  return await isAuth(req);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/salespersons", "/login"],
};
