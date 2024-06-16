import prisma from "@/lib/db";
import DropdownSalesPersons from "../components/dropdownSalesPersons";
import { createCommission, getAllSalesPersons } from "../server/actions";
import { Input } from "@nextui-org/react";

export default async function Page() {
  const salesPersons = await getAllSalesPersons();

  return (
    <main>
      <div className="flex flex-row  p-24 items-center justify-between gap-4">
        <h1 className="">
          Select the salesperson who will benefit from this real estate and
          specify the rate.
        </h1>
        <form action={createCommission}>
          <div>
            <DropdownSalesPersons salesPersons={salesPersons} />
          </div>
          <div>
            <Input
              name="rate"
              type="number"
              min={0}
              max={100}
              label="Rate"
              isRequired
            />
          </div>
        </form>
      </div>
    </main>
  );
}
