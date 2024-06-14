import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface TableProps<T> {
  data: T[];
  headers: string[];
  keys: (keyof T)[];
  onRowClick?: (item: T) => void;
}

export function DataTable<T>({ data = [], headers, keys, onRowClick }: TableProps<T>) {
  return (
    <div className='w-full bg-white rounded-lg overflow-x-auto'>
      <Table className='min-w-full'>
        <TableHeader className='cursor-default'>
          <TableRow>
            {headers.map((header, index) => (
              <TableHead key={index} className="max-w-full">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='cursor-pointer'>
          {data.map((item, index) => (
            <TableRow key={index} onClick={() => { onRowClick && onRowClick(item) }}>
              <TableCell className="font-medium">{String(index + 1).padStart(2, '0')}</TableCell>
              {keys.map((key, keyIndex) => (
                <TableCell key={keyIndex}>{(item[key] as string)}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
