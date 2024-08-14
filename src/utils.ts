import { jwtVerify } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const checkIfTokenIsValid = async (token: RequestCookie | undefined) => {

    if (token && typeof token.value === "string") {
        const secret = new TextEncoder().encode(process.env.SECRET);
        const { payload, protectedHeader } = await jwtVerify(token.value, secret);
        return Boolean(payload)
    }
    return false
}