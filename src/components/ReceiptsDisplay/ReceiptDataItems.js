import ReceiptDataItem from "./ReceiptDataItem";

const ReceiptDataItems = ({ items, categories, onCategoryChangeHandler }) => {
  return (
    <>
      {items.map((item) => (
        <ReceiptDataItem
          key={item.order}
          item={item}
          categories={categories}
          onCategoryChangeHandler={(category, subcategory) =>
            onCategoryChangeHandler(item.id, category, subcategory)
          }
        />
      ))}
    </>
  );
};

export default ReceiptDataItems;
