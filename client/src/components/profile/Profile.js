import React, { useEffect } from 'react'
import { Container, Toolbar } from '@material-ui/core'
import coverpic from '../image/download (20).jpg'
import profilePic from '../image/download (21).jpg'
import {makeStyles} from '@material-ui/core/styles'
import Feed from '../feed/Feed'
import {useSelector,useDispatch} from 'react-redux'
import { userProfile } from '../redux/post/postAction'
import { useParams } from 'react-router'
const useStyle=makeStyles((theme)=>({
    root:{
        marginTop:'56px'
    },
    image_box:{
        width:'100%',
        height:'40vh',
        position:'relative'
    },
    imgae:{
        position:'absolute',
        left:'38%',
        [theme.breakpoints.up('md')]:{
            left:'45%',
        },
        bottom:'-50px',
        height:'100px',
        width:'100px',
        borderRadius:'50%'
    }

    
}))
const Profile = () => {
    const classes=useStyle()
    const {userPost,currentUser} = useSelector(state => state.postData)
    const dispatch = useDispatch()
    //{/* onClick={() => dispatch(userProfile(userDetail._id))} */}
    // const dispatch = useDispatch()
    // useEffect(()=>{
    //     dispatch(userProfile())
    // },[])
    console.log(currentUser)
    const id=useParams().id
    useEffect(()=>{
        dispatch(userProfile(id))
    },[id])
    console.log(id)
    return (
        <>
            <div className='container-fluid' className={classes.root}>
                {/* <Toolbar /> */}
                <Container maxWidth='lg' className='container border'>
                   <div className={classes.image_box}>
                       <img
                       style={{width:'100%',height:'100%',objectFit:'cover'}}
                        src={coverpic} alt="" 
                        />
                        <img
                        className={classes.imgae}
                         src={profilePic} alt="" />

                   </div>
                </Container>
                <Feed
                timelinePost={userPost}
                currentUserId={currentUser._id}
                />
            </div>
        </>
    )
}

export default Profile
