import { configureStore } from '@reduxjs/toolkit';
import counterReducer, { AppState } from './main/index';

export const store = configureStore({
  reducer: {
    app: counterReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export interface RootAppState {
  app: AppState;
}
