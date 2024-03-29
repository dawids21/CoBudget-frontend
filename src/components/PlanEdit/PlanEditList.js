import React, { useReducer } from "react";

import ApiClient from "../../util/api-client";
import { useOktaAuth } from "@okta/okta-react";
import PlanEditListCategoryContent from "./PlanEditListCategoryContent";
import PlanEditListSubcategoryContent from "./PlanEditListSubcategoryContent";
import NestedList from "../UI/NestedList/NestedList";
import useSnackbar from "../../hooks/use-snackbar";

const planReducer = (state, action) => {
  if (action.type === "CHANGE_VALUE") {
    const copyOfState = [...state].map((category) => ({
      ...category,
      sub: [...category.sub],
    }));
    const category = copyOfState.find(
      (category) => category.id === action.categoryId
    );
    const subcategoryIndex = category.sub.findIndex(
      (subcategory) => subcategory.id === action.subcategoryId
    );
    const subcategory = category.sub[subcategoryIndex];
    category.sub[subcategoryIndex] = {
      ...subcategory,
      amount: action.value,
    };
    return copyOfState;
  }
  return state;
};

const PlanEditList = (props) => {
  const { alert } = useSnackbar();
  const { authState } = useOktaAuth();
  const { accessToken } = authState.accessToken;
  const { categories, plan, isSendingRequest } = props;
  const { plannedCategories } = plan;
  const [planState, dispatchPlan] = useReducer(
    planReducer,
    categories.map((category) => {
      const plannedCategory = plannedCategories.find(
        (plannedCategory) => category.id === plannedCategory.id
      );

      if (!plannedCategory) {
        const subcategories = category.subcategories.map((subcategory) => ({
          ...subcategory,
          amount: "",
        }));
        return { ...category, sub: subcategories };
      }

      const subcategories = category.subcategories.map((subcategory) => {
        const plannedSubcategory = plannedCategory.plannedSubcategories.find(
          (plannedSubcategory) => subcategory.id === plannedSubcategory.id
        );

        if (!plannedSubcategory) {
          return { ...subcategory, amount: "" };
        }

        return { ...subcategory, amount: `${plannedSubcategory.amount}` };
      });

      return { ...category, sub: subcategories };
    })
  );

  const changeSubcategoryHandler = (categoryId, subcategoryId, event) => {
    dispatchPlan({
      type: "CHANGE_VALUE",
      categoryId,
      subcategoryId,
      value: Math.round(parseFloat(event.target.value) * 100),
    });
  };

  const blurSubcategoryHandler = async (categoryId, subcategoryId) => {
    const category = planState.find((category) => category.id === categoryId);
    const subcategory = category.sub.find(
      (subcategory) => subcategory.id === subcategoryId
    );
    const { amount } = subcategory;
    const apiClient = new ApiClient(accessToken);
    isSendingRequest(true);
    try {
      await apiClient.planCategory(
        subcategory.id,
        plan.id,
        amount ? parseInt(amount) : 0
      );
    } catch (e) {
      alert("Cannot update plan", "ERROR");
    } finally {
      isSendingRequest(false);
    }
  };

  const getCategoryComponent = (category, clickHandler, isOpen) => {
    return (
      <PlanEditListCategoryContent
        category={category}
        onClick={clickHandler}
        isOpen={isOpen}
      />
    );
  };

  const getSubcategoryComponent = (subcategory, category) => {
    return (
      <PlanEditListSubcategoryContent
        subcategory={subcategory}
        amount={subcategory.amount / 100}
        onChange={(event) =>
          changeSubcategoryHandler(category.id, subcategory.id, event)
        }
        onBlur={blurSubcategoryHandler.bind(null, category.id, subcategory.id)}
      />
    );
  };

  return (
    <NestedList
      data={planState}
      listComponent={getCategoryComponent}
      subListComponent={getSubcategoryComponent}
    />
  );
};

export default PlanEditList;
