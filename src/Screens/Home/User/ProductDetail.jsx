import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../../Styles/pages/_productDetail.scss";
import { AppContext } from "../../../Context/AppContext";
import asset from "../../../Utility/asset";
import Layout from "../../../layout/Layout";

const ProductDetail = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(AppContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const foundProduct = products.find((item) => item.id == productId);
    if (foundProduct) {
      setProductData(foundProduct);
      setImage(foundProduct.image[0]);
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    addToCart({ ...productData, selectedSize: size });
    navigate("/cart");
  };

  if (!productData) return <div>Loading...</div>;

  return (
    <Layout className="container">
      <div className="product-container">
        <div className="product-main">
          <div className="product-images">
            <div className="product-images-main-image">
              <img
                src={productData.image}
                alt={productData.title}
              />
            </div>
          </div>

          <div className="product-info">
            <h1>{productData.title}</h1>
            <div className="rating">
              {[...Array(4)].map((_, i) => (
                <img key={i} src={asset.star_icon} alt="Star" />
              ))}
              <img src={asset.star_icon} alt="Star dull" />
              <p>(122)</p>
            </div>

            <p className="price">
              {currency}
              {productData.price}
            </p>
            <p className="description">{productData.description}</p>

            <div className="size-selector">
              <p>Select Size</p>
              <div className="sizes">
                {productData.sizes?.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={item === size ? "active" : ""}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="buttons">
              <button onClick={handleAddToCart} className="add-to-cart">
                ADD TO CART
              </button>
              <button className="add-to-cart buyNow">BUY NOW</button>
            </div>

            <hr />
            <div className="extra-info">
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="desc-review">
        <div className="tabs">
          <b>Description</b>
          <p>Reviews (122)</p>
        </div>
        <div className="content">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet.
          </p>
          <p>
            It serves as a virtual marketplace where businesses and individuals can
            showcase their products and conduct transactions without a physical store.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
