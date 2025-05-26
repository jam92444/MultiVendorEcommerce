// components/LatestCollection/LatestCollection.jsx
import { useContext, useEffect, useState } from "react";
import "../Styles/components/_latestCollection.scss";
import { AppContext } from "../Context/AppContext";
import ProductItems from "./ProductItems";
import Title from "./Title";

const LatestCollection = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const {products} = useContext(AppContext)
  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="collectionWrapper">
      <div className="header">
        <Title text1={"LATEST"} text2={"TRENDS"} />
        <p className="subtext">
          Discover the latest in style and tech from our newest arrivals.
        </p>
      </div>

      <div className="grid">
        {latestProducts.map((item) => (
          <ProductItems
            key={item.id}
            id={item.id}
            image={item.image}
            name={item.title}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
