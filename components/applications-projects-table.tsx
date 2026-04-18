"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useState } from "react";
import { projects, type Project, type ProjectTag } from "@/app/applications/data";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CardFrame, CardFrameFooter } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function repoSlug(source?: string): string {
  if (!source) return "—";
  try {
    const parts = new URL(source).pathname.split("/").filter(Boolean);
    return parts[parts.length - 1] ?? "—";
  } catch {
    return "—";
  }
}

/** Column widths for table-fixed; table has min-w so narrow viewports scroll horizontally. */
function columnLayoutClass(columnId: string): string {
  switch (columnId) {
    case "name":
      return "w-[34%] min-w-[11rem] max-w-none";
    case "repo":
      return "w-[38%] min-w-[10rem]";
    case "live":
      return "w-[10%] min-w-[3.5rem] whitespace-nowrap";
    case "tag":
      return "w-[18%] min-w-[6.5rem] text-end";
    default:
      return "";
  }
}

function SortChevrons({ state }: { state: false | "asc" | "desc" }) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex shrink-0 flex-col items-center leading-none"
    >
      <ChevronUpIcon
        className={cn(
          "size-3.5 sm:size-4",
          state === "asc"
            ? "text-foreground opacity-100"
            : "text-muted-foreground opacity-40",
        )}
      />
      <ChevronDownIcon
        className={cn(
          "-mt-0.5 size-3.5 sm:size-4",
          state === "desc"
            ? "text-foreground opacity-100"
            : "text-muted-foreground opacity-40",
        )}
      />
    </span>
  );
}

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "name",
    cell: ({ row }) => (
      <div className="truncate font-medium leading-snug text-foreground">
        {row.getValue("name")}
      </div>
    ),
    header: "Title",
    id: "name",
  },
  {
    accessorFn: (row) => repoSlug(row.sourceCode),
    cell: ({ row }) => {
      const href = row.original.sourceCode;
      const label = repoSlug(href);
      if (!href) {
        return (
          <div className="truncate font-mono text-sm leading-snug text-muted-foreground">
            {label}
          </div>
        );
      }
      return (
        <div className="min-w-0">
          <a
            className="truncate font-mono font-medium text-sm leading-snug text-muted-foreground hover:text-foreground hover:underline"
            href={href}
            rel="noreferrer"
            target="_blank"
          >
            {label}
          </a>
        </div>
      );
    },
    header: "Repo",
    id: "repo",
  },
  {
    cell: ({ row }) => {
      const href = row.original.liveDemo;
      if (!href) {
        return (
          <span className="truncate font-mono font-medium text-sm leading-snug text-muted-foreground">N/A</span>
        );
      }
      return (
        <a
          className="truncate font-mono font-medium text-sm leading-snug hover:text-foreground hover:underline"
          href={href}
          rel="noreferrer"
          target="_blank"
        >
          View
        </a>
      );
    },
    enableSorting: false,
    header: "Live",
    id: "live",
  },
  {
    accessorKey: "tag",
    cell: ({ row }) => {
      const tag = row.getValue("tag") as ProjectTag;
      return (
        <span className="ms-auto inline-flex max-w-full items-center rounded-md border border-border bg-muted px-2 py-1 truncate text-xs font-medium capitalize leading-none text-foreground/90">
          {tag}
        </span>
      );
    },
    header: "Tag",
    id: "tag",
    sortingFn: (a, b, columnId) =>
      String(a.getValue(columnId)).localeCompare(String(b.getValue(columnId))),
  },
];

const cellPad =
  "px-3 py-2 align-middle text-sm leading-snug first:ps-3.5 last:pe-3.5 sm:first:ps-4 sm:last:pe-4";

export function ApplicationsProjectsTable() {
  const pageSize = 10;

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  });

  const [sorting, setSorting] = useState<SortingState>([
    {
      desc: false,
      id: "name",
    },
  ]);

  const table = useReactTable({
    columns,
    data: projects,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getRowId: (row) => row.id,
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
  });

  return (
    <CardFrame className="flex w-full max-w-full flex-col overflow-hidden">
      <div
        className="max-h-[calc(100svh-10.5rem)] overflow-x-auto overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] md:max-h-[calc(100svh-11.5rem)]"
        role="region"
        aria-label="Projects table"
      >
        <Table
          variant="card"
          className="w-full table-fixed text-sm max-md:min-w-[720px]"
        >
          <TableHeader className="sticky top-0 z-10 shadow-[0_1px_0_0_var(--border)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="hover:bg-transparent" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const id = header.column.id;
                  const sorted = header.column.getIsSorted();
                  return (
                  <TableHead
                    key={header.id}
                    className={cn(
                      cellPad,
                      columnLayoutClass(id),
                      "h-9 text-sm font-medium text-muted-foreground",
                    )}
                  >
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          "flex h-full min-h-8 cursor-pointer select-none items-center gap-2",
                          id === "tag" ? "justify-end" : "justify-start",
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            header.column.getToggleSortingHandler()?.(e);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      >
                        <SortChevrons
                          state={
                            sorted === "asc" || sorted === "desc"
                              ? sorted
                              : false
                          }
                        />
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )
                    )}
                  </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    const id = cell.column.id;
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          cellPad,
                          columnLayoutClass(id),
                          id === "tag" && "text-end",
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="px-4 py-6 text-center text-sm text-muted-foreground"
                  colSpan={columns.length}
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <CardFrameFooter className="shrink-0 border-t px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <p className="text-muted-foreground text-sm font-medium sm:text-sm">
              Viewing
            </p>
            <Select
              items={Array.from({ length: table.getPageCount() }, (_, i) => {
                const start = i * table.getState().pagination.pageSize + 1;
                const end = Math.min(
                  (i + 1) * table.getState().pagination.pageSize,
                  table.getRowCount(),
                );
                const pageNum = i + 1;
                return { label: `${start}-${end}`, value: pageNum };
              })}
              onValueChange={(value) => {
                table.setPageIndex((value as number) - 1);
              }}
              value={table.getState().pagination.pageIndex + 1}
            >
              <SelectTrigger
                aria-label="Select result range"
                className="w-fit min-w-none"
                size="sm"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectPopup>
                {Array.from({ length: table.getPageCount() }, (_, i) => {
                  const start = i * table.getState().pagination.pageSize + 1;
                  const end = Math.min(
                    (i + 1) * table.getState().pagination.pageSize,
                    table.getRowCount(),
                  );
                  const pageNum = i + 1;
                  return (
                    <SelectItem key={pageNum} value={pageNum}>
                      {`${start}-${end}`}
                    </SelectItem>
                  );
                })}
              </SelectPopup>
            </Select>
            <p className="text-muted-foreground text-sm font-medium sm:text-sm">
              of <span className="text-foreground">{table.getRowCount()}</span>
            </p>
          </div>

          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="sm:*:[svg]:hidden"
                  render={
                    <Button
                      disabled={!table.getCanPreviousPage()}
                      onClick={() => table.previousPage()}
                      size="sm"
                      variant="outline"
                    />
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="sm:*:[svg]:hidden"
                  render={
                    <Button
                      disabled={!table.getCanNextPage()}
                      onClick={() => table.nextPage()}
                      size="sm"
                      variant="outline"
                    />
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </CardFrameFooter>
    </CardFrame>
  );
}
