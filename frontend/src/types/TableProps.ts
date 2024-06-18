export interface TableProps<T> {
    data: T[];
    headers: string[];
    keys: (keyof T)[];
    onRowClick?: (item: T) => void;
  }