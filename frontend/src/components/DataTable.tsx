"use client"

import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { Part } from "@/types/Part"
import { Component } from "@/types/Component"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CardFooter } from "./ui/card"

import { InstanceProps } from "@/types/InstanceProps"

export const columns: ColumnDef<InstanceProps>[] = [
  {
    accessorKey: "partName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Part Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="Capitalize">{row.getValue("partName")}</div>,
  },
  {
    accessorKey: "componentName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Component Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="Capitalize">{row.getValue("componentName")}</div>,
  },
  {
    accessorKey: "partQuantity",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize disabled">0/{row.getValue("partQuantity")}</div>
    ),
  },
  {
    id: "select",
    cell: () => (
      <Checkbox disabled />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Re-assign</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTable() {
  const {productName, instanceId} = useParams();
  const [data, setData] = useState<InstanceProps[]>([])
  const navigate = useNavigate();

  const fetchComponentsAndParts = async () => {
    try {
      const componentResponse = await fetch(`http://localhost:5000/api/v1/add-product/${productName}`);
      const componentData = await componentResponse.json();

      const componentsWithParts = await Promise.all(
        componentData.components.map(async (component: Component) => {
          const partResponse = await fetch(`http://localhost:5000/api/v1/add-product/${productName}/${component.componentLabel}/parts`);
          const partData = await partResponse.json();
          
          return partData.parts.map((part: Part) => ({
            partName: part.partLabel,
            componentName: component.componentLabel,
            partQuantity: part.partQuantity,
          }));
        })
      );

      setData(componentsWithParts.flat());
    } catch (error) {
      console.error('Error fetching components and parts:', error);
    }
  };

  useEffect(() => {
    fetchComponentsAndParts();
  }, [productName]);

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDelete = async () => {

    try{
      const response = await fetch(`http://localhost:5000/api/v1/new-instance/${productName}/${instanceId}`,{
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if(response.ok){
        console.log('Parts discarded successfully');
      } else {
        console.error('Error discarding instance');
      }
    } catch (error) {
      console.error('Error handling serial number:', error);
    }
  }

  const handleSubmit = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/v1/new-instance/${productName}/${instanceId}/completed`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if(response.ok){
        console.log('Instance marked as completed successfully');
        navigate(`/new-instance`)
      } else {
        console.error('Error marking instance as completed');
      }
    } catch (error) {
      console.error('Error marking instance as completed:', error);
    }
  }

  const handleArchive = async () => {
    try{
      const response = await fetch(`http://localhost:5000/api/v1/new-instance/${productName}/${instanceId}/archived`,{
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        }
      });
      if(response.ok){
        console.log('Instance marked as archived successfully');
        navigate(`/new-instance`)
      } else {
        console.error('Error marking instance as archived');
      }
    } catch (error) {
      console.error('Error marking instance as archived:', error);
    }
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search for a Part..."
          value={(table.getColumn("partName")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("partName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-center">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2 text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 text-sm text-muted-foreground space-x-2 py-4">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} parts assembled.
      </div>
      <div>
      <CardFooter className="flex-center gap-10" >
       <Button variant="destructive" onClick={handleDelete}>Discard</Button>
       <Button variant={"secondary"} onClick={handleArchive}>Archive</Button>
       <Button className="bg-green-600" onClick={handleSubmit} disabled={table.getFilteredRowModel().rows.length != table.getFilteredSelectedRowModel().rows.length} >Submit</Button>
        </CardFooter>  
      </div>
    </div>
  )
}
