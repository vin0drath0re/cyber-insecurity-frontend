import { createContext, useState, useContext, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dob: Date | null;
  pan: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  register1:boolean;
  register2:boolean;
  register3:boolean;
  customerType:string;
}

interface UserContextType {
  user: User;
  updateUser: (key: string, value: any) => void;
}

const UserContext = createContext<UserContextType>({
  user: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: null,
    pan: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    register1:true,
    register2:false,
    register3:false,
    customerType: "INDIVIDUAL"
  },
  updateUser: () => {},
});

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    dob: null,
    pan: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    register1:true,
    register2:false,
    register3:false,
    customerType: "INDIVIDUAL",

  });

  const updateUser = (key: string, value: any) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom Hook for easy access
export function useUser() {
  return useContext(UserContext);
}
