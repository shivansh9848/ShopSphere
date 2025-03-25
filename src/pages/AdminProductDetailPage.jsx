import React from 'react'
import ProductDetails from "../features/product/components/ProductDetail";
import Navbar from "../features/navbar/Navbar";

const AdminProductDetailPage = () => {
    return (
        <Navbar>
          <ProductDetails></ProductDetails>
        </Navbar>
      );
}

export default AdminProductDetailPage