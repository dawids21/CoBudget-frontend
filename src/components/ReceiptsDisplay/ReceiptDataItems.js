import ReceiptDataAccordionItem from "./ReceiptDataAccordionItem";
import ReceiptDataItem from "./ReceiptDataItem";

const ReceiptDataItems = ({
  items,
  categories,
  onCategoryChangeHandler,
  isMobile,
}) => {
  return (
    <>
      {items.map((item) =>
        isMobile ? (
          <ReceiptDataAccordionItem
            key={item.id}
            item={item}
            categories={categories}
            onCategoryChangeHandler={(category, subcategory, categoryId) =>
              onCategoryChangeHandler(item.id, category, subcategory, categoryId)
            }
          />
        ) : (
          <ReceiptDataItem
            key={item.id}
            item={item}
            categories={categories}
            onCategoryChangeHandler={(category, subcategory, categoryId) =>
              onCategoryChangeHandler(item.id, category, subcategory, categoryId)
            }
          />
        )
      )}
    </>
  );
};

export default ReceiptDataItems;
