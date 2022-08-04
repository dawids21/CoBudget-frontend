import React from "react";

import { Typography } from "@mui/material";
import PlanInfoCategoryContent from "./PlanInfoCategoryContent";
import PlanInfoSubcategoryContent from "./PlanInfoSubcategoryContent";
import NestedList from "../UI/NestedList/NestedList";
const PlanInfo = (props) => {
  const { plan } = props;

  plan.forEach((category) => (category.sub = category.plannedSubcategories));

  const getCategoryComponent = (category, clickHandler, isOpen) => {
    return (
      <PlanInfoCategoryContent
        category={category}
        onClick={clickHandler}
        isOpen={isOpen}
      />
    );
  };

  const getSubcategoryComponent = (subcategory) => {
    return <PlanInfoSubcategoryContent subcategory={subcategory} />;
  };

  return (
    <>
      {plan.length !== 0 ? (
        <NestedList
          data={plan}
          listComponent={getCategoryComponent}
          subListComponent={getSubcategoryComponent}
        />
      ) : (
        <Typography sx={{ py: 2 }} variant="h4" component="h3">
          Plan is empty
        </Typography>
      )}
    </>
  );
};

export default PlanInfo;
