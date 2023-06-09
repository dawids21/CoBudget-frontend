import ReceiptDataAccordionItem from "./ReceiptDataAccordionItem";
import ReceiptDataItem from "./ReceiptDataItem";

const ReceiptDataItems = ({
  items,
  categories,
  onCategoryChangeHandler,
  onTotalChangeHandler,
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
              onCategoryChangeHandler(
                item.id,
                category,
                subcategory,
                categoryId
              )
            }
            onTotalChangeHandler={(total) =>
              onTotalChangeHandler(item.id, total)
            }
          />
        ) : (
          <ReceiptDataItem
            key={item.id}
            item={item}
            categories={categories}
            onCategoryChangeHandler={(category, subcategory, categoryId) =>
              onCategoryChangeHandler(
                item.id,
                category,
                subcategory,
                categoryId
              )
            }
            onTotalChangeHandler={(total) =>
              onTotalChangeHandler(item.id, total)
            }
          />
        )
      )}
    </>
  );
};

export default ReceiptDataItems;
