/* eslint-disable react/prop-types */
function ItemInfo({ item }) {
  return (
    <div className="p-name">
      <p className="Title-name">{item.company}</p>
      <p className="Product-info">{item.item_name}</p>
    </div>
  );
}

export default ItemInfo;
