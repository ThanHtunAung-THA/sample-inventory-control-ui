/**
 * 
 */
import axios from 'axios';














export const fetchAllSaleData = async () => {
  return await axios.get('http://localhost:8000/api/sale/get');
};

export const fetchAllPurchaseData = async () => {
  return await axios.get('http://localhost:8000/api/purchase/get');
};

export const fetchAllUserData = async () => {
  return await axios.get('http://localhost:8000/api/user/get');
};

// ==========================

export const fetchProfileData = async ( type, userID ) => {
  return await axios.get(`http://localhost:8000/api/${type}/get/${userID}`);
};

export const updateProfileData = async ( type, userID, data ) => {
  return await axios.post(`http://localhost:8000/api/${type}/edit/${userID}`, data);
};
