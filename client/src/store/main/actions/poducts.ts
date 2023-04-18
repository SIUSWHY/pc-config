import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import getItemsByCategory from '../../../API/getItemsByCategory';
import { AppState } from '..';
import { ItemType } from '../../../types/categories';

const getProductsByCategory = createAsyncThunk('product/byCategory', async (category: string) => {
  const response = await getItemsByCategory(category);
  return response;
});

export const ProductActions = { getProductsByCategory };

export const addProductExtraReducers = (builder: ActionReducerMapBuilder<AppState>) => {
  builder.addCase(getProductsByCategory.pending, state => {
    state.loaders['products'] = true;
  });

  builder.addCase(getProductsByCategory.fulfilled, (state, action: PayloadAction<ItemType[]>) => {
    state.products = action.payload;
    state.loaders['products'] = false;
  });
};
