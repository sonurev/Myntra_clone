/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";
import Item from "../componenets/Item";
import "../styles/ProductList.css";
import { Outlet, useLoaderData } from "react-router-dom";
function ProductList() {
  const items = useLoaderData();
  // console.log(items);
  // const items = useSelector((state) => state.items);
  // console.log(items);
  return (
    <div className="Container-items">
      <div className="listContainer">
        {
          items.map((item) => (<Item key={item.id} item={item} />))
        }
      </div>
      <Outlet />
    </div>
  );
}

export default ProductList;

export const FetchData = () => {
  return fetch("http://localhost:8080/items")
    .then((res) => res.json())
    .then((data) => {
      return data.items[0];
    });
};