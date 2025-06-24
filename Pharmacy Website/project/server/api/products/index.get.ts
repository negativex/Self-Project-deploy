import { mockProducts } from '../data/products';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 12;
  const category = query.category as string;
  const brand = query.brand as string;
  const minPrice = parseFloat(query.minPrice as string) || 0;
  const maxPrice = parseFloat(query.maxPrice as string) || Infinity;
  const inStock = query.inStock === 'true';
  const featured = query.featured === 'true';
  const sortBy = query.sortBy as string || 'name';
  const sortOrder = query.sortOrder as string || 'asc';

  let filteredProducts = [...mockProducts];

  // Apply filters
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.slug === category || p.categoryId === parseInt(category)
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (inStock) {
    filteredProducts = filteredProducts.filter(p => p.stock > 0);
  }

  if (featured) {
    filteredProducts = filteredProducts.filter(p => p.featured);
  }

  // Price range filter
  filteredProducts = filteredProducts.filter(p => 
    p.price >= minPrice && p.price <= maxPrice
  );

  // Sorting
  filteredProducts.sort((a, b) => {
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
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    totalItems: filteredProducts.length,
    totalPages: Math.ceil(filteredProducts.length / limit),
    currentPage: page,
    hasNext: endIndex < filteredProducts.length,
    hasPrev: page > 1
  };
});
