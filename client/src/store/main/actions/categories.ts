import { ActionReducerMapBuilder, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import getAllCategories from '../../../API/getAllCategories';
import { AppState } from '..';
import { CategoryType } from '../../../types/categories';

const getCategories = createAsyncThunk('categories/getAll', async () => {
  const response = await getAllCategories();
  return response;
});

export const CategoryActions = { getCategories };

export const addCategoryExtraReducers = (builder: ActionReducerMapBuilder<AppState>) => {
  builder.addCase(getCategories.pending, state => {
    state.loaders['categories'] = true;
  });

  builder.addCase(getCategories.fulfilled, (state, action: PayloadAction<CategoryType[]>) => {
    state.categories = action.payload;
    state.loaders['categories'] = false;
  });

  builder.addCase(getCategories.rejected, state => {
    state.loaders['categories'] = false;
  });
};
