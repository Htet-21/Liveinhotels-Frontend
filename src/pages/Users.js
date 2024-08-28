import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '../components/Table';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';

function Users() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/users', {
          params: {
            limit: pageSize,
            skip: (page - 1) * pageSize,
          },
        });
        setUsers(response.data.users);
        setTotalItems(response.data.total);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, [page, pageSize]);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredUsers(users);
    } else {
      const searchLower = searchTerm.toLowerCase();
      setFilteredUsers(users.filter(user =>
        (user.firstName && user.firstName.toLowerCase().includes(searchLower)) ||
        (user.email && user.email.toLowerCase().includes(searchLower)) ||
        (user.username && user.username.toLowerCase().includes(searchLower)) ||
        (user.phone && user.phone.toLowerCase().includes(searchLower)) ||
        (user.university && user.university.toLowerCase().includes(searchLower))
      ));
    }
  }, [searchTerm, users]);

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

  const userColumns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'firstName' },
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'Phone', accessor: 'phone' },
    { header: 'University', accessor: 'university' },
  ];

  return (
    <div className="container">
      <h1>Users</h1>
      <a href='products'>Products</a>
      <Filter onSearch={handleSearch} />
      <Table columns={userColumns} data={filteredUsers} />
      {totalPages > 1 && filteredUsers.length === pageSize && (
        <div className="pagination-controls">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <select className='select' value={pageSize} onChange={handlePageSizeChange}>
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

export default Users;
