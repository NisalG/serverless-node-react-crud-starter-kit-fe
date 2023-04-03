// Define the interfaces/types for the Cart and Item objects
export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

export interface Cart {
  billNo: number;
  items: Item[];
  customerName: string;
  description: string;
  totalAmount: number;
}

// Define the shape of the state object
export interface CartState extends Cart {
  loading: boolean;
  error: string | null;
}

// Define the shape of the action object
export interface CartAction {
  type: string;
  payload?: any;
}
