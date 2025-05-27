// components/Product/Product.jsx
import React, { useContext, useEffect, useState } from "react";
import "../../../Styles/pages/_product.scss";
import Title from "../../../Components/Title";
import asset from "../../../Utility/asset";
import { AppContext } from "../../../Context/AppContext";
import ProductItems from "../../../Components/ProductItems";
import Layout from "../../../layout/Layout";

const Product = () => {
  const { products, showSearch, search } = useContext(AppContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilter = () => {
    let copy = [...products];

    if (search && showSearch) {
      copy = copy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      copy = copy.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      copy = copy.filter((item) => subCategory.includes(item.subCategory));
    }

    setFiltered(copy);
  };

  const sortProducts = () => {
    let copy = [...filtered];
    switch (sortType) {
      case "low-high":
        copy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        copy.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        return;
    }
    setFiltered(copy);
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  return (
    <Layout className="container ">
      <div className="product-page">
        {/* Filter Sidebar */}
        <aside className="filter-sidebar">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="filter-toggle"
          >
            FILTERS
            <img
              className={`dropdown-icon ${showFilter ? "rotate" : ""}`}
              src={asset.dropDown}
              alt=""
            />
          </p>

          {/* Category */}
          <div
            className={`filter-group ${showFilter ? "" : "hidden"} sm:block`}
          >
            <p className="filter-title">CATEGORIES</p>
            <div className="filter-options">
              {["Men", "Women", "Kids"].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleCategory}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Subcategory */}
          <div
            className={`filter-group ${showFilter ? "" : "hidden"} sm:block`}
          >
            <p className="filter-title">TYPE</p>
            <div className="filter-options">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type}>
                  <input
                    type="checkbox"
                    value={type}
                    onChange={toggleSubCategory}
                  />{" "}
                  {type}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="product-grid">
          <div className="grid-header">
            <Title text1="ALL" text2="PRODUCTS" />
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="sort-select"
            >
              <option value="relavent">Sort by Relevant</option>
              <option value="low-high">Low to High</option>
              <option value="high-low">High to Low</option>
            </select>
          </div>

          <div className="grid">
            {filtered.map((item) => (
              <ProductItems
                key={item.id}
                id={item.id}
                name={item.title}
                image={item.image}
                price={item.price}
              />
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Product;
