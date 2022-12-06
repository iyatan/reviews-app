import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth, realTimeDb } from "./firebase/clientApp";

interface AppContextInterface {
  currentUser: User | null;
  user: string;
  username: string;
  posts: any;
}
interface Props {
  children?: ReactNode;
}
export const UserContext = createContext<AppContextInterface>(
  {} as AppContextInterface
);

export const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (posts && posts.length !== 0) {
      setPosts(posts);
    }
  }, [posts]);
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
    <UserContext.Provider value={{ currentUser, posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};
