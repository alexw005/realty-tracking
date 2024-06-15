'use server'

import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";


export async function addSalesPersons(formData: FormData) {
    const name = formData.get('name') as string;
    console.log(name, formData);
}
export async function login(formData: FormData) {

    const userName = formData.get('username') as string;
    const password = formData.get('password') as string;
    if (userName === 'admin' && password === process.env.ADMINPASSWORD) {
        const token = sign({ userName, role: 'admin' }, process.env.SECRET as string, { expiresIn: '1h' });
        const cookieStore = cookies();
        if (typeof (token) === 'string') {
            cookieStore.set('token', token, { sameSite: "strict" });
        }
    }
    return undefined
}