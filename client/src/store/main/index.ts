import { createSlice } from '@reduxjs/toolkit';
import { CategoryType, ItemType } from '../../types/categories';
import { addCategoryExtraReducers } from './actions/categories';
import { addProductExtraReducers } from './actions/poducts';

export interface AppState {
  categories: CategoryType[];
  products: ItemType[];
  loaders: Record<string, boolean>;
}

const initialState: AppState = {
  categories: [],
  products: [],
  loaders: {
    categories: false,
    products: false,
  },
};

export const counterSlice = createSlice({
  name: 'App',
  initialState,
  reducers: {},
  extraReducers: builder => {
    addCategoryExtraReducers(builder);
    addProductExtraReducers(builder);
  },
});

export default counterSlice.reducer;
