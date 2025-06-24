import { mockProducts } from '../data/products';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const searchQuery = (query.q as string)?.toLowerCase() || '';
  const page = parseInt(query.page as string) || 1;
  const limit = parseInt(query.limit as string) || 12;
  const category = query.category as string;
  const brand = query.brand as string;
  const minPrice = parseFloat(query.minPrice as string) || 0;
  const maxPrice = parseFloat(query.maxPrice as string) || Infinity;
  const inStock = query.inStock === 'true';
  const sortBy = query.sortBy as string || 'relevance';
  const sortOrder = query.sortOrder as string || 'desc';

  if (!searchQuery.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Search query is required'
    });
  }

  let searchResults = mockProducts.filter(product => {
    const matchesName = product.name.toLowerCase().includes(searchQuery);
    const matchesDescription = product.description.toLowerCase().includes(searchQuery);
    const matchesTags = product.tags.some(tag => tag.toLowerCase().includes(searchQuery));
    const matchesBrand = product.brand.toLowerCase().includes(searchQuery);
    const matchesCategory = product.category.name.toLowerCase().includes(searchQuery);
    
    return matchesName || matchesDescription || matchesTags || matchesBrand || matchesCategory;
  });

  // Apply additional filters
  if (category) {
    searchResults = searchResults.filter(p => 
      p.category.slug === category || p.categoryId === parseInt(category)
    );
  }

  if (brand) {
    searchResults = searchResults.filter(p => 
      p.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  if (inStock) {
    searchResults = searchResults.filter(p => p.stock > 0);
  }

  // Price range filter
  searchResults = searchResults.filter(p => 
    p.price >= minPrice && p.price <= maxPrice
  );

  // Sorting
  searchResults.sort((a, b) => {
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
        aVal = a.name.toLowerCase();
        bVal = b.name.toLowerCase();
        break;
      case 'relevance':
      default:
        // Simple relevance scoring based on where the match occurs
        const getRelevanceScore = (product: any) => {
          let score = 0;
          if (product.name.toLowerCase().includes(searchQuery)) score += 10;
          if (product.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery))) score += 5;
          if (product.brand.toLowerCase().includes(searchQuery)) score += 3;
          if (product.description.toLowerCase().includes(searchQuery)) score += 2;
          if (product.category.name.toLowerCase().includes(searchQuery)) score += 1;
          return score;
        };
        aVal = getRelevanceScore(a);
        bVal = getRelevanceScore(b);
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
  const paginatedResults = searchResults.slice(startIndex, endIndex);

  return {
    products: paginatedResults,
    totalItems: searchResults.length,
    totalPages: Math.ceil(searchResults.length / limit),
    currentPage: page,
    hasNext: endIndex < searchResults.length,
    hasPrev: page > 1,
    searchQuery
  };
});
