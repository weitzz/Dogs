import { PHOTOS_GET } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";

const slice = createAsyncSlice({
    name: 'feed',
    initialState: {
        list: [],
        pages: 1,
        inifinite: true
    },
    reducers: {
        addPhotos(state, action) {
            state.list.push(...action.payload)
            if(action.payload.length === 0) state.inifinite = false
        }
    },
    addPage(state) {
        state.pages++
    },
    resetState(state) {
        state.inifinite = true
        state.pages = 1
        state.data = null
        state.loading = false
        state.error = null
        state.list = []

    },
     fetchConfig: ({ page, total, user }) => PHOTOS_GET({ page: page, total: total, user: user }),

})

export const fetchFeed = slice.asyncAction

export const { resetState: resetFeedState, addPage, addPhotos } = slice.actions

export const loadNewPhotos =  ({total= 6, user}) =>async (dispatch,getState) => {
    const { feed } = getState()
    dispatch(addPage())
    const { payload} = await dispatch(fetchFeed({ page: feed.pages, total, user }))
    dispatch(addPhotos(payload))
}


export default slice.reducer