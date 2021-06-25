import {
    TIMELINE_POST, USER_POST, POST_REQUEST_FIELD, CREATE_POST,ALL_USER,CURRENT_USER,UPDATE_TIMELINE_USERPOST
} from './postType'
import axios from 'axios'

//ALL TIMEline post
export const TimelinePost = () => {
    return async dispatch => {
        // alert('timeline')
        try {
            const result = await axios.get('/timelinePost')
            // const result2 = await axios.get('/userPost')
            // console.log(result2)
            // alert('timeline')
            dispatch({ type: TIMELINE_POST, payload: result.data })
            // dispatch({ type: USER_POST, payload: result2.data })
        } catch (error) {
            dispatch({ type: POST_REQUEST_FIELD, payload: error.message })
        }

    }
}
/// create post 
export const createPost = (data) => {
    return async dispatch => {
        // alert('creat')
        const { text, image } = data
        console.log(text, image)
        const formdata = new FormData()
        formdata.append('text', text)
        formdata.append('image', image)
        const result = await axios.post('/createPost', formdata)
        dispatch({ type: CREATE_POST, payload: result.data })
    }
}//
// user profile
export const userProfile=(id)=>{
    return async dispatch=>{
        const result1=await axios.post(`/userPost/${id}`);
        const result2=await axios.post(`/currectUser/${id}`);
        // console.log(result.data)
        dispatch({ type: USER_POST, payload: result1.data })
        dispatch({ type: CURRENT_USER, payload: result2.data })
    }
}
// all user
export const AllUser=()=>{
    return async dispatch=>{
        const result=await axios.get('/allUsers')
        dispatch({type:ALL_USER,payload:result.data})
    }
}
//FOLLow usrr
export const followUser=(id)=>{
    return async dispatch=>{
        const result=await axios.patch(`/follwer/${id}`)
        dispatch(AllUser())
    }
}
//unfollow user
export const unfollowUser=(id)=>{
    return async dispatch=>{
        const result=await axios.patch(`/unfollwer/${id}`)
        dispatch(AllUser())
    }
}
//like / unlike
export const likeTogole=(id)=>{
    return async dispatch=>{
        const result=await axios.patch(`/like/${id}`)
        dispatch(TimelinePost())
    }
}
//add comment
export const addComment=(data)=>{
    return async dispatch=>{
        // console.log(data)
        const {cmnt,id}=data
        const result=await axios.patch(`/addComment/${id}`,{text:cmnt})
        dispatch({type:UPDATE_TIMELINE_USERPOST,payload:result.data})
        console.log(result.data)
        // dispatch(TimelinePost())
    }
}