'use client'
import { Input } from "@nextui-org/react";
import { addSalesPersons } from "../server/actions";
import SubmitButton from "../components/SubmitButton";

export default function Page() {
    return (
        <main>
            <div className="flex flex-col  p-24 items-center justify-between ">
                <h1 className="">Add Sales Person</h1>
                <div>
                    <form action={addSalesPersons}>

                        <Input type="name" label="Name" name="name" required />
                        <Input type="email" label="Email" name="email" required />
                        <SubmitButton />
                    </form>
                </div>
            </div>
        </main>
    )
}