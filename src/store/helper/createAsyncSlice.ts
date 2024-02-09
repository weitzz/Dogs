/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from '@reduxjs/toolkit';
import { IPhoto } from '../../types/types';

interface IState {
  loading: boolean;
  error?: string | null;
  data?: IPhoto | null;
}

interface Config {
  name: string;
  initialState: IState;
  reducers: any;
  // eslint-disable-next-line @typescript-eslint/ban-types
  fetchConfig: (payload:IPayload) => { url: string; options?: {} };
}
interface IPayload {
  payload?: string | IPhoto 

}

const createAsyncSlice = (config: Config) => {
  const initialState: IState = {
    loading: false,
    data: null,
    error: null,
    ...config.initialState,
  };

  const fetchAsyncThunk: AsyncThunk<IPhoto, any, {}> = createAsyncThunk(
    config.name,
    async (payload, { dispatch }) => {
      try {
        dispatch(slice.actions.fetchStarted());
        const { url, options } = config.fetchConfig(payload);
        const response = await fetch(url, options);
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  );

  const slice = createSlice({
    name: config.name,
    initialState,
    reducers: {
      fetchStarted(state:IState) {
        state.loading = true;
      },
      fetchSuccess(state: IState, action: PayloadAction<IPhoto>) {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      },
      fetchError(state: IState, action: PayloadAction<string>) {
        state.loading = false;
        state.data = null;
        state.error = action.payload;
      },
      resetState(state: IState) {
        state.loading = false;
        state.data = null;
        state.error = null;
      
      },
      ...config.reducers,
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAsyncThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      });
      builder.addCase(fetchAsyncThunk.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message || 'An error occurred.';
      });
    },
  });

  return { ...slice, asyncAction: fetchAsyncThunk };
};

export default createAsyncSlice;
