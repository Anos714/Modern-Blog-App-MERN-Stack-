import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const { currentUser, loading } = useSelector((state) => state.user);
  console.log(currentUser, loading);

  return <div>Hello {currentUser?.username}</div>;
};

export default Home;
