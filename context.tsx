import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "@firebase/auth";
import { auth } from "./firebase/clientApp";

interface AppContextInterface {
  user: string;
  username: string;
  post: any;
}
interface Props {
  children?: ReactNode;
}
export const UserContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user as any);
      } else {
        setCurrentUser(null);
      }
    });
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
};
