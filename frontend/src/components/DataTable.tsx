import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DialogBox } from '@/components/Dialogbox';

interface TableProps<T> {
  data: T[];
  headers: string[];
  keys: (keyof T)[];
  onRowClick?: (item: T) => void;
  fetchItems: () => void;
}

export function DataTable<T>({ data = [], headers, keys, onRowClick, fetchItems }: TableProps<T>) {
  return (
    <div className='w-full md:w-3/4 lg:w-1/2 flex flex-col justify-center'>
      {/* <div className='flex flex-col items-center mb-4'>
        <DialogBox onItemAdded={fetchItems} />
      </div> */}
      <div className="bg-white rounded-lg">
        <Table>
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
    </div>
  );
}
