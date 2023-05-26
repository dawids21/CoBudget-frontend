import ReceiptDataItem from "./ReceiptDataItem";

const ReceiptDataItems = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <ReceiptDataItem key={item.order} item={item} />
      ))}
    </>
  );
};

export default ReceiptDataItems;
