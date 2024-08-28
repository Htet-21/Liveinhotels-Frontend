import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

function Products() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products', {
          params: {
            limit: pageSize,
            skip: (page - 1) * pageSize,
          },
        });
        setProducts(response.data.products);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(products);
    } else {
      const searchLower = searchTerm.toLowerCase();
      setFilteredProducts(products.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchLower)) ||
        (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
        (product.category && product.category.toLowerCase().includes(searchLower))
      ));
    }
  }, [searchTerm, products]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= Math.ceil(totalItems / pageSize)) {
      setPage(newPage);
    }
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setPage(1);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setPage(1);
  };

  const totalPages = Math.ceil(totalItems / pageSize);

  const productColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Title', accessor: 'title' },
    { header: 'Brand', accessor: 'brand' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', accessor: 'price' },
    { header: 'Stock', accessor: 'stock' },
  ];

  return (
    <div className="container">
      <h1>Products</h1>
      <a href='users'>Users</a>
      <Filter onSearch={handleSearch} />
      <Table columns={productColumns} data={filteredProducts} />
      {totalPages > 1 && filteredProducts.length === pageSize && (
        <div className="pagination-controls">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      )}
    </div>
  );
}

export default Products;