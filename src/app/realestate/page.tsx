"use client";
import { Input } from "@nextui-org/react";
import { addRealEstate, addSalesPersons } from "../server/actions";
import SubmitButton from "../components/SubmitButton";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col p-6 sm:p-24 items-center gap-4 place-content-evenly	">
        <h1 className="">Add Realestate</h1>
        <div>
          <form action={addRealEstate}>
            <Input
              variant="bordered"
              className="p-1"
              type="name"
              label="Name"
              name="name"
              required
            />
            <Input
              variant="bordered"
              className="p-1"
              type="address"
              label="Address"
              name="address"
              required
            />
            <Input
              variant="bordered"
              className="p-1"
              type="number"
              min={0}
              label="Price"
              name="price"
              required
            />
            <SubmitButton>Add</SubmitButton>
          </form>
        </div>
      </div>
    </main>
  );
}
