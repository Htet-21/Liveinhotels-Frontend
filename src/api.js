import axios from 'axios';

export const fetchUsers = async (dispatch, pageSize, page) => {
  const response = await axios.get(`https://dummyjson.com/users?limit=${pageSize}&skip=${(page - 1) * pageSize}`);
  dispatch({ type: 'SET_USERS', payload: response.data.users });
};

export const fetchProducts = async (dispatch, pageSize, page) => {
  const response = await axios.get(`https://dummyjson.com/products?limit=${pageSize}&skip=${(page - 1) * pageSize}`);
  dispatch({ type: 'SET_PRODUCTS', payload: response.data.products });
};