import { mockProducts } from '../data/products';

export default defineEventHandler(async (event) => {
  const productId = getRouterParam(event, 'id');
  
  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ID is required'
    });
  }

  // Find product by ID or slug
  const product = mockProducts.find(p => 
    p.id === parseInt(productId) || p.slug === productId
  );

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    });
  }

  // Simulate related products (same category, different products)
  const relatedProducts = mockProducts
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return {
    product: {
      ...product,
      relatedProducts
    }
  };
});
