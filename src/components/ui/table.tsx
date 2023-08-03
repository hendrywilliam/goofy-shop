import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

//table root </table>
interface TableRoot
  extends React.TableHTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableRootVariants> {
  custom?: string;
}
type TableRootRef = HTMLTableElement;

const tableRootVariants = tv({
  base: "border p-2",
});

const Table = React.forwardRef<TableRootRef, TableRoot>((props, ref) => {
  return (
    <table
      className={tableRootVariants({ class: props.custom })}
      {...props}
      ref={ref}
    >
      {props.children}
    </table>
  );
});

Table.displayName = "Table";

//table caption </caption>
interface TableCaption
  extends React.TableHTMLAttributes<HTMLTableCaptionElement> {
  custom?: string;
}
type TableCaptionRef = HTMLTableCaptionElement;

const tableCaptionVariants = tv({
  base: "border p-2",
});

const TableCaption = React.forwardRef<TableCaptionRef, TableCaption>(
  (props, ref) => {
    return (
      <caption
        className={tableCaptionVariants({ class: props.custom })}
        {...props}
        ref={ref}
      >
        {props.children}
      </caption>
    );
  }
);

TableCaption.displayName = "TableCaption";

//table header </thead>
interface TableHeader
  extends React.TableHTMLAttributes<HTMLTableSectionElement> {}
type TableHeaderRef = HTMLTableSectionElement;

const TableHeader = React.forwardRef<TableHeaderRef, TableHeader>(
  (props, _) => {
    return <thead>{props.children}</thead>;
  }
);

TableHeader.displayName = "TableHead";

//table body </tbody>
interface TableBody
  extends React.TableHTMLAttributes<HTMLTableSectionElement> {}
type TableBodyRef = HTMLTableSectionElement;

const TableBody = React.forwardRef<TableBodyRef, TableBody>((props, ref) => {
  return (
    <tbody {...props} ref={ref}>
      {props.children}
    </tbody>
  );
});

TableBody.displayName = "TableBody";

//table footer </tfoot>
interface TableFooter
  extends React.TableHTMLAttributes<HTMLTableSectionElement> {}
type TableFooterRef = HTMLTableSectionElement;

const TableFooter = React.forwardRef<TableFooterRef, TableFooter>(
  (props, ref) => {
    return (
      <tfoot {...props} ref={ref}>
        {props.children}
      </tfoot>
    );
  }
);

TableFooter.displayName = "TableFooter";

//table row </tr>
interface TableRow extends React.TableHTMLAttributes<HTMLTableRowElement> {}
type TableRowRef = HTMLTableRowElement;

const TableRow = React.forwardRef<TableRowRef, TableRow>((props, ref) => {
  return <tr>{props.children}</tr>;
});

TableRow.displayName = "TableRow";

//table head </th>
interface TableHead
  extends React.TableHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableHeadVariants> {
  custom?: string;
}
type TableHeadRef = HTMLTableCellElement;

const tableHeadVariants = tv({
  base: "p-2",
});

const TableHead = React.forwardRef<TableHeadRef, TableHead>((props, ref) => {
  return (
    <th
      className={tableHeadVariants({ class: props.custom })}
      {...props}
      ref={ref}
    >
      {props.children}
    </th>
  );
});

TableHead.displayName = "TableHead";

//table data </td>
interface TableData
  extends React.TableHTMLAttributes<HTMLTableCellElement>,
    VariantProps<typeof tableDataVariants> {
  custom?: string;
}
type TableDataRef = HTMLTableCellElement;

const tableDataVariants = tv({
  base: "p-2",
});

const TableData = React.forwardRef<TableDataRef, TableData>((props, ref) => {
  return (
    <td
      {...props}
      className={tableDataVariants({ class: props.custom })}
      ref={ref}
    >
      {props.children}
    </td>
  );
});

TableData.displayName = "TableData";

export {
  Table,
  TableCaption,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableData,
};

/**
 * anatomy
 * |-Table (table)
 * |--TableCaption
 * |--TableHeader
 * |----TableRow (tr)
 * |------TableHead (th)
 * |--TableBody
 * |----TableRow (tr)
 * |------TableData (td)
 * |--TableFooter
 * |----TableRow (tr)
 * |------TableData (td)
 */
