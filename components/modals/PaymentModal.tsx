
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "sonner";
import { Account } from '@/types/bankTypes';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  onPayment: (fromId: string, toId: string, amount: number) => void;
  payeeAccNo:string;
}

const PaymentModal = ({ isOpen, onClose, accounts, onPayment, payeeAccNo }: PaymentModalProps) => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [description, setDesciption] = useState('');
  const [amount, setAmount] = useState('');
  
  const handlePayment = () => {
    const parsedAmount = parseFloat(amount);
    if (!fromAccount || !toAccount) {
      toast.error('Please select both accounts');
      return;
    }
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    
    const sourceAccount = accounts.find(acc => acc.id === fromAccount);
    if (sourceAccount && sourceAccount.balance < parsedAmount) {
      toast.error('Insufficient funds');
      return;
    }

    onPayment(fromAccount, toAccount, parsedAmount);
    setFromAccount('');
    setToAccount('');
    setAmount('');
    onClose();
  };

  useEffect(()=>{
    console.log(payeeAccNo)
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Payment Money</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label>From Account</label>
            <Select value={fromAccount} onValueChange={setFromAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Select source account" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name} ({account.number})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
          <label>To Account</label>
          <Input
            disabled
              defaultValue={payeeAccNo}
            
            />
          </div>
          <div className="space-y-2">
            <label>Description</label>
            <Input 
              required
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDesciption(e.target.value)}
            />
          </div>


          <div className="space-y-2">
            <label>Amount</label>
            <Input
              required
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handlePayment}>Payment</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    
  );
};

export default PaymentModal;
