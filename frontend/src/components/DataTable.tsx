import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { InstanceProps } from '@/types/InstanceProps';
import { Component } from '@/types/Component';
import { Part } from '@/types/Part';
import { CardFooter } from '@/components/ui/card';
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
} from '@tanstack/react-table';
import { useToast } from '@/components/ui/use-toast';

interface DataTableProps {
  assembledCounts: Record<string, number>;
}

export const DataTable: React.FC<DataTableProps> = ({ assembledCounts }) => {
  const { productName, instanceId } = useParams<{ productName: string, instanceId: string }>();
  const [data, setData] = useState<InstanceProps[]>([]);
  const [allAssembled, setAllAssembled] = useState(true);
  const navigate = useNavigate(); 
  const { toast } = useToast();

  useEffect(() => {
    setAllAssembled(data.every(row => row.assembledCounts[row.componentLabel] === row.partQuantity));
  }, [data]);

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
            componentLabel: component.componentLabel,
            partQuantity: part.partQuantity,
            assembledCounts: assembledCounts,
          }));
        })
      );

      setData(componentsWithParts.flat());
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: "Error",
        description: `Error fetching components and parts: ${error.message}`,
      })
    }
  };

  useEffect(() => {
    fetchComponentsAndParts();
  }, [productName]);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/instance/${productName}/${instanceId}/completed`, {
        method: 'PATCH',
      });
      if (response.ok) {
        toast({
          variant: 'success',
          title: "Success",
          description: `Instance submitted successfully`,
        })
        navigate('/new-instance')
      } else {
        const errorData = await response.json();
        toast({
          variant: 'destructive',
          title: "Error",
          description: `Error submitting instance: ${errorData.msg}`,
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error handling serial number: ${error.message}`,
        variant: "destructive",
      });
    }
  }

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/instance/${productName}/${instanceId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/new-instance')
        toast({
          variant: 'success',
          title: "Success",
          description: `Instance deleted successfully`,
        })
      } else {
        toast({
          variant: 'destructive',
          title: "Error",
          description: `Error deleting instance`,
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error handling serial number: ${error.message}`,
        variant: "destructive",
      });
    }
  }

  const handleArchive = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/instance/${productName}/${instanceId}/archived`, {
        method: 'PATCH',
      });
      if (response.ok) {
        toast({
          variant: 'success',
          title: "Success",
          description: `Instance archived successfully`,
        })
        console.log('Instance archived successfully');
        navigate('/new-instance')
      } else {
        toast({
          variant: 'destructive',
          title: "Error",
          description: `Error archiving instance`,
        })
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Error archiving instance!`,
        variant: "destructive",
      });
      console.error('Error archiving instance!');
    }
  }

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

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

  useEffect(() => {
    setAllAssembled(data.every(row => row.assembledCounts[row.componentLabel] === row.partQuantity));
  }, [data]);  

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Search for a Part..."
          value={(table.getColumn('partName')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('partName')?.setFilterValue(event.target.value)
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
        {table.getFilteredSelectedRowModel().rows.length} of{' '}
        {table.getFilteredRowModel().rows.length} parts assembled.
      </div>
      <div>
        <CardFooter className="flex-center gap-10">
          <Button variant="destructive" onClick={handleDelete}>Discard</Button>
          <Button variant="secondary" onClick={handleArchive}>Archive</Button>
          <Button
            className="bg-green-600"
            onClick={handleSubmit}
            disabled={!allAssembled}
          >
            Submit
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};

const columns: ColumnDef<InstanceProps>[] = [
  {
    accessorKey: 'partName',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Part Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('partName')}</div>,
  },
  {
    accessorKey: 'componentLabel',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Component Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue('componentLabel')}</div>,
  },
  {
    accessorKey: 'partQuantity',
    header: 'Status',
    cell: ({ row }) => {
      const componentLabel = row.getValue('componentLabel') as string;
      const assembledCount = row.original.assembledCounts[componentLabel] || 0;
      return <div className="capitalize disabled">{assembledCount}/{row.getValue('partQuantity')}</div>;
    },
  },  
  {
    id: "select",
    cell: ({ row }) => {
      const componentLabel = row.getValue('componentLabel') as string;
      const assembled = row.original.assembledCounts[componentLabel] === row.getValue('partQuantity');
      return(
      <Checkbox
        checked={row.getIsSelected() || assembled}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
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
      );
    },
  },
];

export default DataTable;
