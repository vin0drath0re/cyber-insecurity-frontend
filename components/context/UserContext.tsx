"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

interface Payee {
  name: string;
  payeeifsc: string;
  payeeAccNo: string;
  payeeType: string;
}

interface AddPayeeResponse {
  id: string;
  name: string;
  payeeAccNo: string;
  payeeType: string;
  payeeifsc: string;
}

interface EditPayeeResponse {
  // Define the structure of the response from the edit payee API
  id: string;
  name: string;
  payeeAccNo: string;
  payeeType: string;
  payeeifsc: string;
}

interface DeletePayeeResponse {
  // Define the structure of the response from the delete payee API
}

interface CheckPayeeResponse {
  name : string;
}

interface UserContextType {
  BtnLoading: boolean;
  fetchPayees: (payerCustomerId: string) => Promise<void>;
  AddPayeeById: (
    payerCustomerId: string,
    name: string,
    payeeifsc: string,
    payeeAccNo: string,
    payeeType: string
  ) => Promise<void>;
  EditPayee: (
    payerCustomerId: string,
    name: string,
    payeeifsc: string,
    payeeAccNo: string,
    payeeType: string
  ) => Promise<void>;
  DeletePayee: (payerCustomerId: string, payeeAccNo: string) => Promise<void>;
  CheckPayeeName: (payeeifsc: string, payeeAccNo: string) => Promise<void>;
  addPayee: AddPayeeResponse[];
  payees: Payee[];
  PayeeName:string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [BtnLoading, setBtnLoading] = useState(false);
  const [payees, setPayees] = useState<Payee[]>([]);
  const [addPayee, setAddPayee] = useState<AddPayeeResponse[]>([]);
  const [PayeeName, setPayeeName] = useState("");

  const fetchPayees = async (payerCustomerId: string) => {
    setBtnLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/api/payees/${payerCustomerId}`
      );
      setPayees(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Error fetching payees:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const AddPayeeById = async (
    payerCustomerId: string,
    name: string,
    payeeifsc: string,
    payeeAccNo: string,
    payeeType: string
  ) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5000/api/payee/${payerCustomerId}`,
        {
          name,
          payeeifsc,
          payeeAccNo,
          payeeType,
        }
      );
      setAddPayee(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Error adding payee:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const EditPayee = async (
    payerCustomerId: string,
    name: string,
    payeeifsc: string,
    payeeAccNo: string,
    payeeType: string
  ) => {
    setBtnLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:5000/api/payee/${payerCustomerId}`,
        {
          name,
          payeeifsc,
          payeeAccNo,
          payeeType,
        }
      );
      setAddPayee(response.data);
      //console.log(response.data);
    } catch (error) {
      console.error("Error editing payee:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const DeletePayee = async (payerCustomerId: string, payeeAccNo: string) => {
    setBtnLoading(true);
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/payee/${payerCustomerId}`,
        {
          data: { payeeAccNo },
        }
      );
      //console.log(response.data);
    } catch (error) {
      console.error("Error deleting payee:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  const CheckPayeeName = async (payeeAccNo: string , payeeifsc: string, ) => {
    setBtnLoading(true);
    
    try {
      //console.log(payeeifsc, payeeAccNo);
      
      const response = await axios.post('http://localhost:5000/api/payees/name', {
        data: {
          payeeifsc,
          payeeAccNo
        }
      });
      
      if (!response.data?.customerName) {
        throw new Error('Customer name not found in response');
      }
      
      setPayeeName(response.data.customerName);
      //console.log(response.data);
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Server responded with error:", error.response.data);
          // Handle specific status codes
          if (error.response.status === 404) {
            console.error('Resource not found');
          } else if (error.response.status === 401 || error.response.status === 403) {
            console.error('Authentication/Authorization failed');
          }
        } else if (error.request) {
          console.error("No response received from server");
        } else {
          console.error("Error sending request:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    } finally {
      setBtnLoading(false);
    }
  };
  return (
    <UserContext.Provider
      value={{
        BtnLoading,
        fetchPayees,
        AddPayeeById,
        EditPayee,
        DeletePayee,
        CheckPayeeName,
        addPayee,
        payees,
        PayeeName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("UserData must be used within a UserContextProvider");
  }
  return context;
};
