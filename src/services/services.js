import axios from 'axios';

// const baseUrl = 'http://localhost:4000/api';
const baseUrl = '/api';
export const getRecipes = async (url) => {
  let request = await axios.get(url);
  return request.data;
};

export const getSaved = async () => {
  let request = await axios.get(baseUrl);
  return request.data;
};

export const addSaved = async (obj) => {
  let request = await axios.post(baseUrl, obj);
  return request;
};

export const deleteRecipe = async (id) => {
  let request = await axios.delete(baseUrl + `/${id}`);
  return request.data;
};

function randomId() {
  return Math.random() * 100;
}
