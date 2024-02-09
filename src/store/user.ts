/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_GET } from "../api";
import createAsyncSlice from "./helper/createAsyncSlice";
import { fetchToken, resetTokenState } from "./token";

const slice = createAsyncSlice({
    name: 'user',
    fetchConfig: (token) => USER_GET(token)
   
})

export const fetchUser = slice.asyncAction
export const {resetState:resetUserState , fetchError} = slice.actions

export const userLogin = (user: any) => async (dispatch) => {
   const {payload} =  await dispatch(fetchToken(user))
    if (payload.token) {
        window.localStorage.setItem('token',payload.token)
        await dispatch(fetchUser(payload.token))
    }
    
}

export const userLogout = () => async (dispatch: any) => {
   const {payload} =  await dispatch(resetUserState())
    if (payload.token) await dispatch(resetTokenState(payload.token))
    window.localStorage.removeItem('token')
}

export const autoLogin = () =>async (dispatch,getState) => {
    const { token } = getState()
    if (token?.data?.token) {
        const { type } = await dispatch(fetchUser(token.data.token))
        if(type === fetchError.type) dispatch(userLogout())
    }
}


export default slice.reducer