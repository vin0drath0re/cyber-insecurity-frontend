export interface Account {
  id: string;
  name: string;
  number: string;
  type: "checking" | "savings" | "investment";
  balance: number;
  currency: string;
}

export const accounts: Account[] = [
  {
    id: "1",
    name: "Investment Portfolio",
    number: "INV-001",
    type: "investment",
    balance: 25000.0,
    currency: "USD",
  },
  {
    id: "2",
    name: "Retirement Account",
    number: "INV-002",
    type: "investment",
    balance: 45000.0,
    currency: "USD",
  },
  {
    id: "3",
    name: "Trading Account",
    number: "INV-003",
    type: "investment",
    balance: 15000.0,
    currency: "USD",
  },
];
