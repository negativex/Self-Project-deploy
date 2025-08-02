import { mockProducts } from '../../data/products';

export default defineEventHandler(async (event) => {
  const method = getMethod(event);
  const productId = getRouterParam(event, 'id');
  
  if (!productId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Product ID is required'
    });
  }

  const product = mockProducts.find(p => 
    p.id === parseInt(productId) || p.slug === productId
  );

  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Product not found'
    });
  }

  if (method === 'GET') {
    // Get current inventory status
    return {
      productId: product.id,
      productName: product.name,
      currentStock: product.stock,
      inStock: product.stock > 0,
      lowStock: product.stock > 0 && product.stock < 10,
      outOfStock: product.stock === 0
    };
  }

  if (method === 'PUT') {
    // Update inventory
    const body = await readBody(event);
    const { stock, operation } = body;

    if (operation === 'set' && typeof stock === 'number') {
      // Set absolute stock level
      product.stock = Math.max(0, stock);
    } else if (operation === 'add' && typeof stock === 'number') {
      // Add to current stock
      product.stock = Math.max(0, product.stock + stock);
    } else if (operation === 'subtract' && typeof stock === 'number') {
      // Subtract from current stock
      product.stock = Math.max(0, product.stock - stock);
    } else {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid operation or stock value'
      });
    }

    return {
      success: true,
      productId: product.id,
      productName: product.name,
      previousStock: body.previousStock || 0,
      newStock: product.stock,
      operation,
      message: `Stock updated successfully`
    };
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  });
});
