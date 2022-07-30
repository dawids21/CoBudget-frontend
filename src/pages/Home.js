import React, { useEffect } from "react";
import Logo from "../components/UI/Logo";

const Home = () => {
  useEffect(() => {
    document.title = "CoBudget";
  }, []);
  return (
    <Logo
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
      variant="h2"
    />
  );
};

export default Home;
