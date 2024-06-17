import prisma from "@/lib/db";
import DropdownSalesPersons from "../components/DropdownSalesPersons";
import {
  createCommission,
  getAllRealEstates,
  getAllSalesPersons,
  getCommissionByRealEstateId,
} from "../server/actions";
import { Input } from "@nextui-org/react";
import DropdownRealestate from "../components/DropdownRealestate";
import SubmitButton from "../components/SubmitButton";
import CommissionTable from "../components/CommisionTable";

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
      <div className="flex flex-col p-6 sm:flex-row sm:p-24 items-center gap-4 place-content-evenly	">
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
            <div className="min-w-36">
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
          <SubmitButton />
        </form>
      </div>
      <div className=" p-6 sm:flex-row sm:p-24 items-center">
        <CommissionTable commissions={commisionByRealestate} />
      </div>
    </main>
  );
}
