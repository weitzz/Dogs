import createAsyncSlice from "./helper/createAsyncSlice";

interface IState {
  modal: boolean;
}

const slice = createAsyncSlice({
  name: 'modal',
  initialState: {
    modal: false
  },
  reducers: {
    openModal(state:any) {
      state.modal = true;
    },
    closeModal(state:any) {
      state.modal = false;
    }
  }
});


export const { openModal, closeModal } = slice.actions;
export default slice.reducer;