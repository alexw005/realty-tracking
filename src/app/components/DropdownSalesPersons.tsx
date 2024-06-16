"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { salesPerson } from "@prisma/client";
import { useState } from "react";

interface DropdownSalesPersonsProps {
  salesPersons: salesPerson[];
}

export default function DropdownSalesPersons(props: DropdownSalesPersonsProps) {
  const { salesPersons } = props;
  const [key, setKey] = useState<number>();

  const handleSelection = (e: React.Key) => {
    setKey(parseInt(e as string));
  };
  return (
    <Autocomplete
      isRequired
      onSelectionChange={handleSelection}
      value={key}
      name="salesPersonId"
      label="Select a person"
      className="max-w-xs"
    >
      {salesPersons.map((person) => (
        <AutocompleteItem key={person.id} value={person.id}>
          {person.name}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
