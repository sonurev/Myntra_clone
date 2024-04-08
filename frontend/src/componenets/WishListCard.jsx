/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import "../styles/Item.css";
import { RxCross2 } from "react-icons/rx";
import { wishlistActions } from "../store/wishlistSlice";
import { bagActions } from "../store/BagSlice";
import { useState } from "react";
function WishListCard({ item }) {
  const products = useSelector((state) => state.baglist);

  const present = products.filter((product) => product.id === item.id);
  // console.log(present.length);

  const [buy, setbuy] = useState(present.length === 0 ? false : true);

  const dispatch = useDispatch();
  return (
    <div className="Card">
      <div className="imageContainer">
        <img src={item.image} alt="" className="image" />
        <button className="dlt-wishlist" onClick={() => dispatch(wishlistActions.removeItem(item.id))}><RxCross2 /></button>
      </div>
      <div className="pinfo">
        <p className="info">{item.item_name}</p>
        <div className="price-box">
          <span className="price">Rs. {item.current_price}&nbsp;</span>
          <span className="original-price">Rs. {item.original_price}&nbsp;</span>
          <span className="discount">({item.discount_percentage}% OFF)</span>
        </div>
      </div>
      <button className={`bag-btn ${buy && "added-bag"}`} onClick={() => {
        if (!buy) return (
          dispatch(bagActions.addItem(item)),
          setbuy(true)
        )
      }}>MOVE TO BAG</button>
    </div>
  );
}

export default WishListCard;

