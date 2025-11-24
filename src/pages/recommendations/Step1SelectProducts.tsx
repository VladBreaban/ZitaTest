import React, { useState, useEffect } from 'react';
import { Button } from '../../components/ui';
import { productService } from '../../services/productService';
import { ShopifyProduct } from '../../types';
import { SelectedProduct } from './CreateRecommendation';

interface Props {
  selectedProducts: SelectedProduct[];
  onSelectProducts: (products: SelectedProduct[]) => void;
  onNext: () => void;
  onCancel: () => void;
  search: string;
  onSearchChange: (value: string) => void;
}

export const Step1SelectProducts: React.FC<Props> = ({
  selectedProducts,
  onSelectProducts,
  onNext,
  onCancel,
  search,
  onSearchChange,
}) => {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('Toate Produsele');
  const [allProducts, setAllProducts] = useState<ShopifyProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchDebounce, setSearchDebounce] = useState('');
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const productsPerPage = 20;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchDebounce(search);
      setCurrentPage(1);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    loadProducts();
  }, [searchDebounce]);

  useEffect(() => {
    filterProducts();
  }, [selectedFilter, allProducts]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts(searchDebounce, 250);
      setAllProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = allProducts;

    if (selectedFilter !== 'Toate Produsele') {
      filtered = allProducts.filter((product: any) => {
        // Use productType (camelCase) as per the API response, with fallback to product_type
        const productType = (product.productType || product.product_type || '').toLowerCase();
        const filterLower = selectedFilter.toLowerCase();
        return productType.includes(filterLower) || productType === filterLower;
      });
    }

    setProducts(filtered);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleProduct = (product: ShopifyProduct) => {
    const isSelected = selectedProducts.some((p) => p.product.id === product.id);
    
    if (isSelected) {
      onSelectProducts(selectedProducts.filter((p) => p.product.id !== product.id));
    } else {
      onSelectProducts([
        ...selectedProducts,
        {
          product,
          quantity: 1,
          dailyDosage: '',
          notes: '',
        },
      ]);
    }
  };

  const isProductSelected = (productId: number) => {
    return selectedProducts.some((p) => p.product.id === productId);
  };

  const canContinue = selectedProducts.length > 0;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div>
      {/* Header & Search */}
      <div className="mb-6">
        <h2 className=' font-serif'
          style={{
            fontSize: '32px',
            lineHeight: '130%',
            letterSpacing: '-0.01em',
            color: '#043B6C',
          }}
        >
          Produse
        </h2>
        <p
          style={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '32px',
            letterSpacing: '-0.01em',
            color: '#4A6A85',
            marginBottom: '16px',
          }}
        >
          Poți regăsi produsele din Magazin. Zitamine are 400 de produse în gamă, și cu siguranță afli produsul cel mai potrivit – pentru cei mai precauți și exigenți pacienți ai tăi!
        </p>

        {/* Product Type Filters */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {[
            { 
              name: 'Toate Produsele', 
              icon: (isSelected: boolean) => (
                <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.75 4.5C13.75 6.57107 12.0711 8.25 10 8.25C7.92893 8.25 6.25 6.57107 6.25 4.5C6.25 2.42893 7.92893 0.75 10 0.75C12.0711 0.75 13.75 2.42893 13.75 4.5Z" stroke={isSelected ? "#FFFFFF" : "#FA9C19"} strokeWidth="1.5"/>
                  <path d="M8.25 14C8.25 16.0711 6.57107 17.75 4.5 17.75C2.42893 17.75 0.75 16.0711 0.75 14C0.75 11.9289 2.42893 10.25 4.5 10.25C6.57107 10.25 8.25 11.9289 8.25 14Z" stroke={isSelected ? "#FFFFFF" : "#FA9C19"} strokeWidth="1.5"/>
                  <path d="M19.25 14C19.25 16.0711 17.5711 17.75 15.5 17.75C13.4289 17.75 11.75 16.0711 11.75 14C11.75 11.9289 13.4289 10.25 15.5 10.25C17.5711 10.25 19.25 11.9289 19.25 14Z" stroke={isSelected ? "#FFFFFF" : "#FA9C19"} strokeWidth="1.5"/>
                </svg>
              )
            },
            { 
              name: 'Suplimente Funcționale & Longevitate', 
              icon: (isSelected: boolean) => (
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.75 9.65998H4.26711C4.70339 9.65998 5.08932 9.37714 5.2207 8.96111L7.7585 0.924717C7.83236 0.690858 8.16372 0.692081 8.23585 0.926479L13.758 18.8736C13.8307 19.1097 14.1654 19.1086 14.2364 18.8719L16.7862 10.3726C16.9131 9.94965 17.3024 9.65998 17.744 9.65998H21.25" stroke={isSelected ? "#FFFFFF" : "#4CA7F8"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            },
            { 
              name: 'Plante și extracte naturale', 
              icon: (isSelected: boolean) => (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 9V7.75C9 3.88401 5.86599 0.75 2 0.75H0.75V2C0.75 5.86599 3.88401 9 7.75 9H9ZM9 9V17.25M16 3.75H17.25V5.25C17.25 9.11599 14.116 12.25 10.25 12.25H9V10.75C9 6.88401 12.134 3.75 16 3.75Z" stroke={isSelected ? "#FFFFFF" : "#84B353"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )
            },
            { 
              name: 'Minerale', 
              icon: (isSelected: boolean) => (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0.75C11 6 14 9 19.25 10C14 11 11 14 10 19.25C9 14 6 11 0.75 10C6 9 9 6 10 0.75Z" stroke={isSelected ? "#FFFFFF" : "#4C71F8"} strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="round"/>
                </svg>
              )
            },
            { 
              name: 'Vitamine', 
              icon: (isSelected: boolean) => (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.2855 0.75L12.2855 1.75M12.2855 1.75L17.2855 6.75M12.2855 1.75L4.28553 9.75M17.2855 6.75L18.2855 7.75M17.2855 6.75L14.2855 9.75M14.2855 9.75L6.78554 17.25C5.40482 18.6307 3.16625 18.6307 1.78553 17.25C0.404821 15.8693 0.404823 13.6307 1.78554 12.25L4.28553 9.75M14.2855 9.75H4.28553" stroke={isSelected ? "#FFFFFF" : "#674A85"} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )
            },
          ].map((filter) => {
            const isSelected = selectedFilter === filter.name;
            return (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className="flex items-center gap-2 px-4 rounded-full text-sm font-medium transition-colors"
                style={{
                  height: '56px',
                  backgroundColor: isSelected ? '#4CA7F8' : '#FFFFFF',
                  color: isSelected ? '#FFFFFF' : '#043B6C',
                  border: isSelected ? 'none' : '1px solid #E6E6E6',
                }}
              >
                {filter.icon(isSelected)}
                {filter.name}
              </button>
            );
          })}
        </div>

        {/* Results count */}
        {!loading && (
          <div className="text-sm text-navy-light mb-4">
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-navy-light">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="col-span-full text-center py-12 text-navy-light">No products found</div>
        ) : (
          paginatedProducts.map((product: any) => {
            const selected = isProductSelected(product.id);
            const imageUrl = product.images?.[0]?.src || '';
            const price = product.variants?.[0]?.price || '0';
            const isHovered = hoveredProductId === product.id;
            const description = (product.bodyHtml || product.body_html || '').replace(/<[^>]*>/g, '').trim();

            return (
              <div
                key={product.id}
                className={`relative cursor-pointer transition-all overflow-hidden ${
                  selected ? 'ring-2 ring-primary' : ''
                }`}
                style={{
                  background: '#FFFFFF',
                  boxShadow: '0px 3.84013px 15.3605px rgba(0, 0, 0, 0.1)',
                  borderRadius: '15px',
                }}
                onClick={() => toggleProduct(product)}
              >
                {/* Product Image - No padding */}
                <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 aspect-square"
                  style={{ borderRadius: '15px 15px 0 0' }}
                >
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  {selected && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  {/* <div className="absolute top-3 left-3 bg-orange text-white text-xs font-bold px-2 py-1 rounded-md">
                    {product.variants?.[0]?.inventoryQuantity || product.variants?.[0]?.inventory_quantity || 0} Capsule
                  </div> */}
                </div>

                {/* Product Info - With padding */}
                <div className="p-4">
                  {/* Product Name */}
                  <h3
                    className="mb-1 line-clamp-2"
                    style={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: 600,
                      fontSize: '26px',
                      lineHeight: '120%',
                      letterSpacing: '-0.02em',
                      color: '#043B6C',
                    }}
                  >
                    {product.title}
                  </h3>

                  {/* Product Description - One line with ellipsis */}
                  <p
                    className="line-clamp-1 mb-3"
                    style={{
                      fontFamily: 'Inter',
                      fontStyle: 'normal',
                      fontWeight: 400,
                      fontSize: '16px',
                      letterSpacing: '-0.01em',
                      color: '#4A6A85',
                    }}
                  >
                    {description}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    {/* Price */}
                    <div className="flex items-baseline gap-1">
                      <span
                        style={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 700,
                          fontSize: '23.0408px',
                          lineHeight: '130%',
                          color: '#043B6C',
                        }}
                      >
                        {price} lei
                      </span>
                      <span
                        style={{
                          fontFamily: 'Inter',
                          fontStyle: 'normal',
                          fontWeight: 500,
                          fontSize: '13.4405px',
                          lineHeight: '130%',
                          color: '#4A6A85',
                        }}
                      >
                        /30 zile
                      </span>
                    </div>

                    {/* Add Button */}
                    <button
                      className="flex items-center justify-center transition-all"
                      style={{
                        width: isHovered && !selected ? '120px' : '57.6px',
                        height: '57.6px',
                        background: selected ? '#4CA7F8' : '#EBEBEB',
                        borderRadius: '153.605px',
                        gap: isHovered && !selected ? '8px' : '0',
                      }}
                      onMouseEnter={() => setHoveredProductId(product.id)}
                      onMouseLeave={() => setHoveredProductId(null)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleProduct(product);
                      }}
                    >
                      {selected ? (
                        <svg className="w-6 h-6" fill="none" stroke="#FFFFFF" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <>
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19M5 12H19" stroke="#FA9C19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {isHovered && (
                            <span
                              style={{
                                fontFamily: 'Inter',
                                fontWeight: 600,
                                fontSize: '14px',
                                color: '#FA9C19',
                              }}
                            >
                              Adaugă
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {!loading && products.length > 0 && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mb-8">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-lg border border-border bg-white text-navy-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {getPageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-navy-light">...</span>
              ) : (
                <button
                  onClick={() => goToPage(page as number)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'bg-white text-navy-light border border-border hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-lg border border-border bg-white text-navy-light disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}


    </div>
  );
};