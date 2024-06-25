export interface TableProps<T> {
    data: T[];
    headers: string[];
    keys: (keyof T)[];
    onRowClick?: (item: T) => void;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
    showActions?: boolean;
  }