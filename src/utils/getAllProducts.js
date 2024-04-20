import axios from 'axios';
import { API_URL } from './constants';


// Function to fetch products from the Fake Store API
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
