import ReceiptDataItem from "./ReceiptDataItem";

const ReceiptDataItems = ({ items, categories }) => {
  return (
    <>
      {items.map((item) => (
        <ReceiptDataItem key={item.order} item={item} categories={categories} />
      ))}
    </>
  );
};

export default ReceiptDataItems;
