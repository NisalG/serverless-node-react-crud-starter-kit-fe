// Define the shape of the item object
export interface Item {
    id: number;
    name: string;
    description: string;
    price: number;
  }
  
  // Define the shape of the state object
  export interface StoreState {
    items: Item[];
    loading: boolean;
    error: string | null;
  }
  
  // Define the shape of the action object
  export interface StoreAction {
    type: string;
    payload?: any;
  }
  