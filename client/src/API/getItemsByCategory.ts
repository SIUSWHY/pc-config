import { axiosInstance } from '.';
import { ItemType } from '../types/categories';

const getItemsByCategory = (category: string) =>
  axiosInstance
    .get<ItemType[]>('/products/', {
      params: {
        category: category,
      },
    })
    .then(({ data }) => data);

export default getItemsByCategory;
