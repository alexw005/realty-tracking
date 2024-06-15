
import { Input } from "@nextui-org/react";
import SubmitButton from "../components/SubmitButton";
import { login } from "../server/actions";
import { FormEvent } from "react";
import { cookies } from "next/headers";

export default function Page() {
    // function handleSubmit(event: FormEvent<HTMLFormElement>) {
    //     const formData = new FormData(event.currentTarget)
    //     const token = login(formData)
    //     const cookieStore = cookies();
    //     if (typeof (token) === 'string') {
    //         cookieStore.set('token', token);
    //     }
    // }
    return (
        <main>
            <div className="flex flex-col  p-24 items-center justify-between gap-4">
                <h1 className="">Login</h1>
                <div>
                    <form action={login}>

                        <Input className='p-1' type="name" label="Username" name="username" required />
                        <Input className='p-1' type="password" label="Password" name="password" required />
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </main>
    )
}