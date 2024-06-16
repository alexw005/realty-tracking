"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { salesPerson } from "@prisma/client";

interface DropdownSalesPersonsProps {
  salesPersons: salesPerson[];
}

export default function DropdownSalesPersons(props: DropdownSalesPersonsProps) {
  const { salesPersons } = props;
  return (
    <Autocomplete
      isRequired
      name="salespersonid"
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
