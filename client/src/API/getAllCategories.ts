import { axiosInstance } from '.';
import { CategoryType } from '../types/categories';

const getAllCategories = () => axiosInstance.get<CategoryType[]>('/categories/').then(({ data }) => data);

export default getAllCategories;
