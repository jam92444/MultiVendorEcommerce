import React, { useContext, useState } from "react";
import DashboardLayout from "../../../layout/DashboardLayout";
import axios from "axios";
import Input from "../../../Components/UI/Input";
import ImageUploading from "react-images-uploading";
import Button from "../../../Components/UI/Button";
import asset from "../../../Utility/asset";
import "../../../Styles/pages/Vendors/_addProduct.scss";
import { AppContext } from "../../../Context/AppContext";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [images, setImages] = useState([]);
  const [price, setPrice] = useState("");
  const [discountedPrice, setDiscountedPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [description, setDescription] = useState("");
  const { user } = useContext(AppContext);
  const handleImageChange = (imageList) => {
    setImages(imageList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imageBase64Array = images.map((image) => image.data_url);

    const productData = {
      name: productName,
      images: imageBase64Array,
      price,
      discountedPrice,
      sizes,
      description,
      vendorId: user.id,
      approved: false,
    };

    try {
      await axios.post(
        "https://66c432c4b026f3cc6cee532c.mockapi.io/products",
        productData
      );
      // Clear form
      setProductName("");
      setImages([]);
      setPrice("");
      setDiscountedPrice("");
      setSizes([]);
      setDescription("");
    } catch (err) {
      console.error(err);
      alert("Error submitting product.");
    }
  };

  const formFields = [
    {
      label: "Product Name",
      type: "text",
      value: productName,
      onChange: (e) => setProductName(e.target.value),
      placeholder: "Enter product name",
    },
    {
      label: "Price",
      type: "number",
      value: price,
      onChange: (e) => setPrice(e.target.value),
      placeholder: "Enter price",
    },
    {
      label: "Discounted Price",
      type: "number",
      value: discountedPrice,
      onChange: (e) => setDiscountedPrice(e.target.value),
      placeholder: "Enter discounted price",
    },
    {
      label: "Sizes (comma-separated)",
      type: "text",
      value: sizes.join(", "),
      onChange: (e) => setSizes(e.target.value.split(",").map((s) => s.trim())),
      placeholder: "e.g. S, M, L, XL",
    },
  ];

  return (
    <DashboardLayout className="container">
      <form onSubmit={handleSubmit} className="add-product">
        <h2 className="add-product__title">Add Product</h2>

        <div className="add-product__fields-grid">
          {formFields.map((field, index) => (
            <div className="add-product__field" key={index}>
              <label>{field.label}</label>
              <Input
                type={field.type}
                value={field.value}
                onChange={field.onChange}
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}
        </div>

        <div className="add-product__field">
          <label>Images</label>
          <ImageUploading
            multiple
            value={images}
            onChange={handleImageChange}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageRemove,
            }) => (
              <div className="add-product__images">
                <Button
                  onClick={onImageUpload}
                  background="transparent"
                  border="0"
                  width="100px"
                  //   margin="2rem 0"
                >
                  <img
                    style={{
                      width: "100%",
                    }}
                    src={asset.Upload}
                    alt=""
                  />
                </Button>
                <Button
                  onClick={onImageRemoveAll}
                  background="#f44336"
                  color="#fff"
                  border="0"
                >
                  Remove All
                </Button>
                <div className="add-product__preview-container">
                  {imageList.map((image, index) => (
                    <div
                      key={index}
                      className="add-product__preview"
                      style={{
                        position: "relative",
                      }}
                    >
                      <img src={image.data_url} width="150px" alt="preview" />
                      <Button
                        onClick={() => onImageRemove(index)}
                        className="removebutton"
                        background="transparent"
                        border="0"
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          background: "transparent",
                          backdropFilter: "blur(2px)",
                          borderRadius: "50%",
                          color: "white",
                        }}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ImageUploading>
        </div>

        <div className="add-product__field">
          <label>Description</label>
          <textarea
            className="add-product__textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Product description"
            rows={4}
            required
          />
        </div>

        <Button type="submit" className="add-product__submit">
          Submit
        </Button>
      </form>
    </DashboardLayout>
  );
};

export default AddProduct;
