import { mockCategories } from '../data/products';

export default defineEventHandler(async (event) => {
  return {
    categories: mockCategories
  };
});
