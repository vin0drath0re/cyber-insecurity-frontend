"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: InvestmentFormData) => void;
}

interface InvestmentFormData {
  symbol: string;
  amount: number;
  investmentType: string;
}

const InvestmentModal = ({
  isOpen,
  onClose,
  onSubmit,
}: InvestmentModalProps) => {
  const [formData, setFormData] = useState<InvestmentFormData>({
    symbol: "",
    amount: 0,
    investmentType: "stock",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Investment</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="investmentType">Investment Type</Label>
            <Select
              value={formData.investmentType}
              onValueChange={(value) =>
                setFormData({ ...formData, investmentType: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select investment type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stock">Stock</SelectItem>
                <SelectItem value="mutual-fund">Mutual Fund</SelectItem>
                <SelectItem value="etf">ETF</SelectItem>
                <SelectItem value="bond">Bond</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="symbol">Symbol</Label>
            <Input
              id="symbol"
              value={formData.symbol}
              onChange={(e) =>
                setFormData({ ...formData, symbol: e.target.value })
              }
              placeholder="Enter symbol (e.g., AAPL)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={formData.amount}
              onChange={(e) =>
                setFormData({ ...formData, amount: Number(e.target.value) })
              }
              placeholder="Enter amount"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Invest</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default InvestmentModal;
