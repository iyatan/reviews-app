import { NextPage } from "next";

import "firebase/compat/firestore";
import "firebase/compat/auth";

import Nav from "./ui/components/Nav";

import { useCollection } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";

const Home: NextPage = () => {
  const [infos, infosLoading, infosError] = useCollection(
    firebase.firestore().collection("infos") as any,
    {}
  );
  if (!infosLoading && infos) {
    infos.docs.map((doc) => console.log(doc.data()));
  }
  return (
    <div className="flex flex-col">
      <Nav />
    </div>
  );
};
export default Home;
