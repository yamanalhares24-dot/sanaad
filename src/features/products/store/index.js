import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  loading: false,
  
  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ loading }),
  
  addProduct: (product) => set((state) => ({
    products: [...state.products, product]
  }))
}));