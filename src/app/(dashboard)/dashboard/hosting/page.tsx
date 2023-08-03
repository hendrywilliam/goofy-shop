import * as React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableFooter,
  TableHeader,
  TableRow,
  TableHead,
  TableData,
} from "@/components/ui/table";

export default function DashboardHostingPage() {
  return (
    <div>
      <p>Manage your hosted places here</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Head1</TableHead>
            <TableHead>Head2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableData custom="p-4 border">Data1</TableData>
            <TableData>Data2</TableData>
            <TableData>Data3</TableData>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableData>FooterData1</TableData>
            <TableData>FooterData2</TableData>
            <TableData>FooterData3</TableData>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
