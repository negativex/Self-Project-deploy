import { mockProducts, mockCategories } from '../../data/products';

export default defineEventHandler(async (event) => {
  const categoryId = getRouterParam(event, 'id');
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 12;
  const sortBy = query.sortBy as string || 'name';
  const sortOrder = query.sortOrder as string || 'asc';
  
  if (!categoryId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Category ID is required'
    });
  }

  // Find category
  const category = mockCategories.find(c => 
    c.id === parseInt(categoryId) || c.slug === categoryId
  );

  if (!category) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Category not found'
    });
  }

  // Get products for this category
  let categoryProducts = mockProducts.filter(p => 
    p.categoryId === category.id
  );

  // Sorting
  categoryProducts.sort((a, b) => {
    let aVal, bVal;
    
    switch (sortBy) {
      case 'price':
        aVal = a.price;
        bVal = b.price;
        break;
      case 'rating':
        aVal = a.rating;
        bVal = b.rating;
        break;
      case 'reviews':
        aVal = a.reviewCount;
        bVal = b.reviewCount;
        break;
      case 'name':
      default:
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
    }

    if (sortOrder === 'desc') {
      return aVal < bVal ? 1 : -1;
    }
    return aVal > bVal ? 1 : -1;
  });

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = categoryProducts.slice(startIndex, endIndex);

  return {
    category,
    products: paginatedProducts,
    totalItems: categoryProducts.length,
    totalPages: Math.ceil(categoryProducts.length / limit),
    currentPage: page,
    hasNext: endIndex < categoryProducts.length,
    hasPrev: page > 1
  };
});
