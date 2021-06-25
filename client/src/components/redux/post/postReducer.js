import {
    TIMELINE_POST,USER_POST,POST_REQUEST_FIELD,CREATE_POST,ALL_USER,CURRENT_USER,UPDATE_TIMELINE_USERPOST
} from './postType'
const postinitialstate = {
    timelinePost:[],
    filterTimeline:[],
    userPost:[],
    alluser:[],
    currentUser:{},
    loading:true,
    friends:[],
    error:'',
}

const postReducer = (state = postinitialstate, action) => {
    switch (action.type) {
       case TIMELINE_POST:
           return{
               ...state,
               timelinePost:action.payload,
               filterTimeline:action.payload,
               loading:false
           }
        case USER_POST:
            // alert(action.type)
            return{
                ...state,
                userPost:action.payload,
                loading:false
            }
        case CURRENT_USER:
            return{
                ...state,
                currentUser:action.payload
            }    
        case CREATE_POST:
            return{
                ...state,
                userPost:[...state.userPost,action.payload],
                timelinePost:[action.payload,...state.timelinePost]
                
            }
        case ALL_USER:
            return{
                ...state,
                alluser:action.payload
            } 
        case UPDATE_TIMELINE_USERPOST:
            return{
                ...state,
                timelinePost:state.timelinePost.map((item)=>{
                    return(
                        item._id===action.payload._id?action.payload:item
                    )
                }),
                userPost:state.userPost.map((item)=>{
                    return(
                        item._id===action.payload._id?action.payload:item
                    )
                }),
            }        
        case POST_REQUEST_FIELD:
            return{
                ...state,
                error:action.payload
            }   
        default: return state
    }
}
export default postReducer



