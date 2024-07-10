export interface  InstanceProps {
    id: string;
    status: string;
    componentLabel: string;
    partLabel: string;
    assembledCounts: Record<string, number>;
    partQuantity: number;
  }