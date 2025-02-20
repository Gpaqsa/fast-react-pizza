import axios from 'axios';

const API_URL = 'https://react-fast-pizza-api.onrender.com/api';
// const API_URL = 'http://localhost:3307/api';

export async function getMenu() {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed getting menu');
  }
}

export async function getOrder(id) {
  try {
    const response = await axios.get(`${API_URL}/order/${id}`);
    return response.data.data;
  } catch (error) {
    throw new Error(`Couldn't find order #${id}`);
  }
}

export async function createOrder(newOrder) {
  try {
    const response = await axios.post(`${API_URL}/order`, newOrder, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error('Failed creating your order');
  }
}

export async function updateOrder(id, updateObj) {
  try {
    await axios.patch(`${API_URL}/order/${id}`, updateObj, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    throw new Error('Failed updating your order');
  }
}