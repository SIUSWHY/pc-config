import { AxiosResponse } from 'axios';
import { axiosInstance } from '.';
import { CategoryType } from '../types/categories';

const getAllCategories = () => axiosInstance.get<CategoryType[]>('/category').then(({ data }) => data);

export default getAllCategories;
