import React,{useEffect} from 'react'
import Feed from '../feed/Feed'
import {useSelector,useDispatch} from 'react-redux'
import {TimelinePost} from '../redux/post/postAction'
const Home = () => {
    const dispatch = useDispatch()
    const {timelinePost} = useSelector(state => state.postData)
    const {userDetail} = useSelector(state => state.userData)
    useEffect(()=>{
        dispatch(TimelinePost())
    },[])
    return (
        <>
            <Feed
            timelinePost={timelinePost}
            currentUserId={userDetail._id}
            />
        </>
    )
}

export default Home
