import axios from 'axios';
import { GET_PRODUCT } from './constants';


// Function to fetch products from the Fake Store API
export const getProduct = async (productId) => {
    try {
        const response = await axios.get(`${GET_PRODUCT}` + productId);
        return response.data;

    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
