"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  getKeyValue,
} from "@nextui-org/react";
import { commission, salesPerson } from "@prisma/client";

const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "NAME", uid: "name" },
  { name: "Percentage", uid: "rate" },
  { name: "Amount", uid: "amount" },
  { name: "ACTIONS", uid: "actions" },
];

interface Commision {
  commissions: commission[];
}

export default function ComissionTable(commision: Commision) {
  const { commissions } = commision;
  const renderCell = (commInfo: commission, columnKey: any) => {
    const cellValue = commInfo[columnKey as keyof commission]?.toString();

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: `./favicon.ico` }}
            description={commInfo.salesPersonId}
            name={`${cellValue}`}
          >
            {commInfo.salesPersonId}
          </User>
        );
      case "rate":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {`${(parseFloat(cellValue) * 100).toFixed(2)}`}
          </Chip>
        );
      case "amount":
        return (
          <Chip className="capitalize" size="sm" variant="flat">
            {`${cellValue.toString()}`}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Edit user">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                Edit
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                Delete
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  return (
    <Table aria-label="Example table with custom cells">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={commissions}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
