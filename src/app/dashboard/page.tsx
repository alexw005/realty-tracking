import prisma from "@/lib/db";
import DropdownSalesPersons from "../components/DropdownSalesPersons";
import {
  createCommission,
  getAllRealEstates,
  getAllSalesPersons,
  getCommissionByRealEstateId,
} from "../server/actions";
import { Button, Input } from "@nextui-org/react";
import DropdownRealestate from "../components/DropdownRealestate";
import SubmitButton from "../components/SubmitButton";
import CommissionTable from "../components/CommisionTable";
import Link from "next/link";

export default async function Page({
  searchParams,
}: {
  searchParams: { realestateId: string };
}) {
  const realestateId = searchParams.realestateId;
  const salesPersons = await getAllSalesPersons();
  const realEstates = await getAllRealEstates();
  const commisionByRealestate = await getCommissionByRealEstateId(
    parseInt(realestateId)
  );

  return (
    <main>
      <div className="flex flex-col pb-0 p-6 sm:flex-row sm:p-24 sm:pb-0 items-center gap-4 place-content-evenly 	">
        <form action={createCommission}>
          <h1 className="">Select the realestate for calculation.</h1>
          <div>
            <DropdownRealestate realEstate={realEstates} />
          </div>

          <h1 className="">
            Select the salesperson who will benefit from this real estate and
            specify the rate.
          </h1>
          <div className="p-4 min-w-16 flex flex-row gap-4 place-content-evenly">
            <div>
              <DropdownSalesPersons salesPersons={salesPersons} />
            </div>
            <div className="w-40">
              <Input
                variant="bordered"
                name="percentage"
                type="number"
                min={0}
                max={100}
                label="Percentage (%)"
                isRequired
              />
            </div>
          </div>
          <SubmitButton>Add</SubmitButton>
          <p className="p-4">
            Please select a new salesperson and click <b>Add</b> to include
            their additional commission in the report.
          </p>
        </form>
      </div>


      <CommissionTable commissions={commisionByRealestate} />

      <div className="flex flex-col p-6 sm:flex-row sm:p-r-24 items-center gap-4 place-content-evenly	">
        <Button className="min-w-80">
          <Link href="/salespersons">Create a new Salesperson record</Link>
        </Button>
        <Button className="min-w-80">
          <Link href="/realestate">Create a new Real Estate record</Link>
        </Button>
      </div>
    </main>
  );
}
