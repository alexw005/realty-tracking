import prisma from "@/lib/db";
import DropdownSalesPersons from "../components/DropdownSalesPersons";
import { createCommission, getAllSalesPersons } from "../server/actions";
import { Input } from "@nextui-org/react";

export default async function Page() {
  const salesPersons = await getAllSalesPersons();

  return (
    <main>
      <div className="flex flex-col p-6 sm:flex-row sm:p-24 items-center gap-4 place-content-evenly	">
        <h1 className="">
          Select the salesperson who will benefit from this real estate and
          specify the rate.
        </h1>
        <form action={createCommission}>
          <div className="min-w-16 flex flex-row gap-4">
            <div>
              <DropdownSalesPersons salesPersons={salesPersons} />
            </div>
            <div className="min-w-36">
              <Input
                name="percentage"
                type="number"
                min={0}
                max={100}
                label="Percentage (%)"
                isRequired
              />
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
