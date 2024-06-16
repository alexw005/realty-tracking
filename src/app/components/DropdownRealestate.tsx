"use client";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { realEstate } from "@prisma/client";
import { parse } from "path";
import { useEffect, useState } from "react";

interface DropdownRealestateProps {
  realEstate: realEstate[];
}

export default function DropdownRealestate(props: DropdownRealestateProps) {
  const { realEstate } = props;
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
  };

  return (
    <div className="p-4 flex flex-row gap-4 place-content-evenly">
      <div>
        <Autocomplete
          isRequired
          value={key}
          name="realEstateId"
          label="Select a real estate"
          className="max-w-xs"
          onSelectionChange={handleBlur}
        >
          {realEstate.map((item) => (
            <AutocompleteItem key={item.id} value={item.id}>
              {item.address}
            </AutocompleteItem>
          ))}
        </Autocomplete>
      </div>
      <div className="min-w-36 max-w-10">
        <Input
          value={price}
          // isDisabled
          name="price"
          type="string"
          min={0}
          label="Price"
          isRequired
        />
      </div>
    </div>
  );
}
