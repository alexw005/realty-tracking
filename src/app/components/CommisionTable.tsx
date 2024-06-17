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
  Button,
  Divider,
} from "@nextui-org/react";
import { Prisma, commission } from "@prisma/client";
import { usePDF } from "react-to-pdf";
const statusColorMap = {
  active: "success",
  paused: "danger",
  vacation: "warning",
};
const columns = [
  { name: "Salesperson's Name", uid: "name" },
  { name: "Percentage", uid: "rate" },
  { name: "Amount", uid: "amount" },
  // { name: "ACTIONS", uid: "actions" },
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
  const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
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
    <>
      <div className=" p-6 sm:flex-row sm:p-24 items-center">
        <Button className="mx-6 " color="primary" onClick={() => toPDF()}>Download as PDF</Button>
        <Divider className="my-4" />
        <div className="px-6" ref={targetRef}>
          <h1 className="px-6 py-1">Commission for property: {commissions[0] ? commissions[0].realEstate.address : ""}</h1>
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
        </div>
      </div>
    </>
  );
}
