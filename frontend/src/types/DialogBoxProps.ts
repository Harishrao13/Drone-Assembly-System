 export interface DialogBoxProps {
    onItemAdded: () => void;
    defaultHolder: string;
    handleSubmit: (data: { [key: string]: string }) => void;
    itemName: string;
  }