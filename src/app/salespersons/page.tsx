"use client";
import { Input } from "@nextui-org/react";
import { addSalesPersons } from "../server/actions";
import SubmitButton from "../components/SubmitButton";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col  p-24 items-center justify-between gap-4">
        <h1 className="">Add Salesperson</h1>
        <div>
          <form action={addSalesPersons}>
            <Input
              className="p-1"
              type="name"
              label="Name"
              name="name"
              required
            />
            <Input
              className="p-1"
              type="email"
              label="Email"
              name="email"
              required
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </main>
  );
}
