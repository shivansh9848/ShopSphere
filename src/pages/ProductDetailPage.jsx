import React from "react";
import ProductDetails from "../features/product/components/ProductDetail";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";

const ProductDetailPage = () => {
  return (
    <>
      <Navbar>
        <ProductDetails></ProductDetails>
      </Navbar>
      <Footer></Footer>
    </>
  );
};

export default ProductDetailPage;
