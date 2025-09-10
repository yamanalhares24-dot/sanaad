import { useState, useEffect } from 'react';
import { products } from '../../../db/products';

export const useProducts = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    setProductList(products);
  }, []);

  return { products: productList };
};