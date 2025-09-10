export const productsApi = {
  getAll: () => {
    return fetch('/api/products').then(res => res.json());
  },
  
  create: (product) => {
    return fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  }
};