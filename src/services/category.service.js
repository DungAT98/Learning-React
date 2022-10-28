import axios from "axios";
import Constants from "../commons/constant";

const categoryUrl = `${Constants.apiUri}/Category`;

const CategoryService = {
  search: (searchCommand) => {
    const params = new URLSearchParams(searchCommand);
    return axios.get(`${categoryUrl}/search?${params}`);
  },
  getById: (id) => {
    return axios.get(`${categoryUrl}/${id}`);
  },
  create: (entity) => {
    return axios.post(categoryUrl, entity);
  },
  delete: (id) => {
    return axios.delete(`${categoryUrl}/${id}`);
  },
};

export default CategoryService;
