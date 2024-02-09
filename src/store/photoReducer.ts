import { PHOTO_GET } from "../api"
import { IPhoto } from "../types/types"

const FETCH_PHOTO_STARTED = 'photo/fetchStarted'
const FETCH_PHOTO_SUCCESS = 'photo/fetchSuccess'
const FETCH_PHOTO_ERROR = 'photo/fetchError'

interface PhotoState {
  loading: boolean;
  error: string | null;
  data: IPhoto | null;
}




const fechtPhotStarted = () => (
    {
    type: FETCH_PHOTO_STARTED
}
)

const fechtPhotSuccess = (data:IPhoto) => (
    {
    type: FETCH_PHOTO_SUCCESS,
        payload: data
}
)

const fechtPhotoError = (error: string) => (
    {
    type: FETCH_PHOTO_STARTED,
    payload: error    
}
)

const initialState: PhotoState = {
    loading: false,
    error: null,
    data: null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function photo(state = initialState, action:any) {
    switch (action.type) {
        case FETCH_PHOTO_STARTED:
            return {
                ...state,
                loading: true,
                error: null,
                data: null
            }
        case FETCH_PHOTO_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload
            }
        
          case FETCH_PHOTO_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
                data: null
            }
        default:
            return state
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fetchPhoto = (id: string) => async (dispatch: (arg0: any) => void) => {
    try {
        dispatch(fechtPhotStarted())
        const {url, options} = PHOTO_GET(id)
        const response = await fetch(url, options)
        const data = await response.json()
        if(response.ok === false) throw new Error(data.message) 
        dispatch(fechtPhotSuccess(data))
    } catch (error) {
        dispatch(fechtPhotoError(error.message))
    }
}