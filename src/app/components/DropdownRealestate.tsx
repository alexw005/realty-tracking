"use client";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { realEstate } from "@prisma/client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

interface DropdownRealestateProps {
  realEstate: realEstate[];
}

export default function DropdownRealestate(props: DropdownRealestateProps) {
  const { realEstate } = props;
  const searchParams = useSearchParams();
  const realestateId = searchParams.get("realestateId");
  const router = useRouter();
  const pathname = usePathname();
  const [key, setKey] = useState<number>();
  const [price, setPrice] = useState<string>();
  useEffect(() => {
    setPrice(
      realEstate
        .find((item) => item.id === (key as number))
        ?.price.toString() || "0"
    );
  }, [key, realEstate]);
  const handleBlur = (e: React.Key) => {
    setKey(parseInt(e as string));
    const params = new URLSearchParams(searchParams);

    if (e && e.toString() !== realestateId) {
      params.set("realestateId", e as string);
      router.push(pathname + "?" + params.toString());
    }
  };

  return (
    <div className="p-4 flex flex-row gap-4 place-content-evenly">
      <div>
        <Autocomplete
          isRequired
          value={key}
          label="Select a real estate"
          className="max-w-xs"
          variant="bordered"
          onSelectionChange={handleBlur}
        >
          {realEstate.map((item) => (
            <AutocompleteItem key={item.id} value={item.id}>
              {item.address}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="w-40">
        <Input
          value={price}
          isReadOnly
          name="price"
          type="string"
          min={0}
          label="Price"
          isRequired
        />
      </div>
      <input name="realEstateId" value={key} hidden={true} />
    </div >
  );
}
