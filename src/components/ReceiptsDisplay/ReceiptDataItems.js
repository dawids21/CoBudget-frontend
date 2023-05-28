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
            key={item.order}
            item={item}
            categories={categories}
            onCategoryChangeHandler={(category, subcategory) =>
              onCategoryChangeHandler(item.id, category, subcategory)
            }
          />
        ) : (
          <ReceiptDataItem
            key={item.order}
            item={item}
            categories={categories}
            onCategoryChangeHandler={(category, subcategory) =>
              onCategoryChangeHandler(item.id, category, subcategory)
            }
          />
        )
      )}
    </>
  );
};

export default ReceiptDataItems;
