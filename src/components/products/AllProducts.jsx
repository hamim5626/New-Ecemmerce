"use client";
import Title from "../reusable/Title";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import ProductCard from "./ProductCard";
import useFetch from "@/hooks/use-fetch";
import { Search, X } from "lucide-react";
import { useState, useMemo } from "react";

const AllProducts = () => {
  const { data: allProducts, loading, error } = useFetch("/get-all-products");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!allProducts?.data) return [];
    
    return allProducts.data.filter(product =>
      product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allProducts, searchTerm]);

  // Get suggestions for search
  const suggestions = useMemo(() => {
    if (!searchTerm || !allProducts?.data) return [];
    
    const uniqueSuggestions = [...new Set(
      allProducts.data
        .filter(product => 
          product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(product => product.product_name)
        .slice(0, 5) // Limit to 5 suggestions
    )];
    
    return uniqueSuggestions;
  }, [searchTerm, allProducts]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setShowSuggestions(value.length > 0);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="mt-[120px] ">
      <div className="container">
        <Title title="All Products" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[16px] mt-[40px]">
          <div className="relative w-full order-1 md:order-2">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setShowSuggestions(searchTerm.length > 0)}
              className="w-full h-[50px] rounded-full pl-8 pr-10 border-primary"
            />
            
            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 flex items-center justify-between"
                  >
                    <span className="text-gray-700">{suggestion}</span>
                    <Search className="w-4 h-4 text-gray-400" />
                  </div>
                ))}
              </div>
            )}
            
            {/* Clear search button */}
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setShowSuggestions(false);
                  setCurrentPage(1);
                }}
                className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <div></div>
        </div>

        {/* Search results info */}
        {searchTerm && (
          <div className="mt-4 text-gray-600">
            Found {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} for "{searchTerm}"
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-[21.34px] gap-y-[32.01px] mt-[40px]">
          {currentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* No results message */}
        {searchTerm && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-500">Try adjusting your search terms or browse all products</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-x-[36px] mt-[120px]">
            <Button 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-white text-heading border px-[30px] py-[21px] rounded-none text-[16px] leading-[24px] font-lato disabled:opacity-50 disabled:cursor-not-allowed"
            >
              PREV
            </Button>
            
            <div className="flex items-center gap-x-[16px]">
              {getPageNumbers().map((page, index) => (
                <span
                  key={index}
                  onClick={() => typeof page === 'number' ? handlePageChange(page) : null}
                  className={`px-[13px] py-[9px] rounded-none text-[16px] font-lato cursor-pointer transition-colors ${
                    page === currentPage
                      ? 'text-white border border-heading bg-heading'
                      : typeof page === 'number'
                      ? 'bg-white border text-heading hover:bg-gray-50'
                      : 'text-gray-400 cursor-default'
                  }`}
                >
                  {page}
                </span>
              ))}
            </div>
            
            <Button 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="text-white bg-heading border px-[30px] py-[21px] rounded-none text-[16px] leading-[24px] font-lato disabled:opacity-50 disabled:cursor-not-allowed"
            >
              NEXT
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
