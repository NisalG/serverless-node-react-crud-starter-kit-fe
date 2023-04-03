// Define the shape of the item object
export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
}

// Define the shape of the state object
export interface ItemState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

// Define the shape of the action object
export interface ItemAction {
  type: string;
  payload?: any;
}
