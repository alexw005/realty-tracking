"use client";
import { Input } from "@nextui-org/react";
import { addRealEstate, addSalesPersons } from "../server/actions";
import SubmitButton from "../components/SubmitButton";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col  p-24 items-center justify-between gap-4">
        <h1 className="">Add Realestate</h1>
        <div>
          <form action={addRealEstate}>
            <Input
              className="p-1"
              type="name"
              label="Name"
              name="name"
              required
            />
            <Input
              className="p-1"
              type="address"
              label="Address"
              name="address"
              required
            />
            <Input
              className="p-1"
              type="number"
              min={0}
              label="Price"
              name="price"
              required
            />
            <SubmitButton />
          </form>
        </div>
      </div>
    </main>
  );
}
