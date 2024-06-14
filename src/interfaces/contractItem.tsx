export interface ContractItem {
  id: number;
  itemClass: "service" | "product";
  itemName: string;
  itemMessage: string;
  itemPrice: number;
  images: string[];
  chargeTax: boolean;
  optional: boolean;
  userId: number;
}

export interface ContractItemState {
  loading: boolean;
  contractItems: ContractItem[];
  error: string | null;
}
