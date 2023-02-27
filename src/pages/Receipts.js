import React, {useEffect} from "react";
import {Typography} from "@mui/material";

const Receipts = () => {
    useEffect(() => {
        document.title = "CoBudget - receipts";
    }, []);
    return (
        <Typography>Receipts</Typography>
    );
};

export default Receipts;
