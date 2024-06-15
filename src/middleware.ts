import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";


function isAuth(req: NextRequest) {

    try {
        const token = req.cookies.get('token')

        if (token && typeof (token.value) === 'string') {
            const decoded = verify(token.value, process.env.SECRET as string);
            console.log(decoded)
            if (decoded) {
                console.log(decoded, req.nextUrl.pathname);
                return NextResponse.redirect(new URL(req.nextUrl.pathname, req.url));
            }
        }

        return NextResponse.redirect(new URL('/login', req.url));

    } catch (err) {
        console.error('Error: ', err);
        return NextResponse.redirect(new URL('/login', req.url));
    }
}


export default function middleware(req: NextRequest) {
    console.log("CHECK");
    return isAuth(req);
}


// See "Matching Paths" below to learn more
export const config = {
    matcher: '/salespersons',
}