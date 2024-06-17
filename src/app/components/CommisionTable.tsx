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
} from "@nextui-org/react";
import { Prisma, commission } from "@prisma/client";

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

type CommissionWithDetailsInfo = {
  commissions: Prisma.commissionGetPayload<{
    include: {
      salesPerson: true,
      realEstate: true
    }
  }>[]
}


export default function ComissionTable(props: CommissionWithDetailsInfo) {
  const { commissions } = props;
  const renderCell = (commInfo: Prisma.commissionGetPayload<{
    include: {
      salesPerson: true,
      realEstate: true
    }
  }>, columnKey: any) => {
    const cellValue = commInfo[columnKey as keyof commission]?.toString();
    const { salesPerson } = commInfo;

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: `./favicon.ico` }}
            name={`${salesPerson.name}`}
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
