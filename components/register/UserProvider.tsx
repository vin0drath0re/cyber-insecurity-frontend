import { createContext, useState, useContext, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  dob: Date | undefined;
  pan: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  register1:boolean;
  register2:boolean;
  register3:boolean;
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
    dob: new Date("1999-12-31"),
    pan: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    register1:true,
    register2:false,
    register3:false,
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
    dob: new Date("1999-12-31"),
    pan: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    register1:true,
    register2:false,
    register3:false,

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
