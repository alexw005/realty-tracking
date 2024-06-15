'use client'
import InputText from "../components/InputText";
import { addSalesPersons } from "../server/actions";

export default function Page() {
    return (
        <main>
            <div className="flex flex-col  p-24 items-center justify-between ">
                <h1 className="">Add Sales Person</h1>
                <div>
                    <form action={addSalesPersons}>

                        <InputText label="name" />

                        <InputText label="email" />
                    </form>
                </div>
            </div>
        </main>
    )
}