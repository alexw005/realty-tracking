"use client";
import { Autocomplete, AutocompleteItem, Input } from "@nextui-org/react";
import { salesPerson } from "@prisma/client";
import { useState } from "react";

interface DropdownSalesPersonsProps {
  salesPersons: salesPerson[];
}

export default function DropdownSalesPersons(props: DropdownSalesPersonsProps) {
  const { salesPersons } = props;
  const [key, setKey] = useState<string>();

  const handleSelection = (e: React.Key) => {
    setKey(e as string);
  };
  return (
    <>
      <Autocomplete
        variant="bordered"
        isRequired
        onSelectionChange={handleSelection}
        value={key}
        label="Select a person"
        className="max-w-xs"
      >
        {salesPersons.map((person) => (
          <AutocompleteItem key={person.id}>{person.name}</AutocompleteItem>
        ))}
      </Autocomplete>
      <input name="salesPersonId" value={key} hidden={true} />
    </>
  );
}
