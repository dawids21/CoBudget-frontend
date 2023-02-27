import React, {useEffect} from "react";
import UnderDevelopment from "../components/UI/UnderDevelopment";

const Receipts = () => {
  useEffect(() => {
    document.title = "CoBudget - receipts";
  }, []);
  return (
    <UnderDevelopment
      sx={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        textAlign: "center"
      }}
      variant="h4"
    />
  );
};

export default Receipts;
