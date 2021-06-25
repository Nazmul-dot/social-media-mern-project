import { Button, Container } from '@material-ui/core'
import {Link} from 'react-router-dom'
import React, { useEffect,useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector, useDispatch } from 'react-redux'
import { AllUser,followUser,unfollowUser } from '../redux/post/postAction'
import fp from '../image/download (20).jpg'
const useStyle = makeStyles((theme) => ({
    dabba: {
        height: '150px',
        width: '120px',
        border: '2px solid black',
        margin: theme.spacing(1),
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative'
    },
    img:{
        width:'100%',
        height:'60%',
        objectFit:'cover',
        marginTop:theme.spacing(1),
        marginBottom:theme.spacing(1)
    }
}))
const Discover = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(AllUser())
    }, [])
    var { alluser } = useSelector(state => state.postData)
    const {userDetail} = useSelector(state => state.userData)
    alluser=alluser.filter((item)=>item._id!=userDetail._id)

    
    const flwcontrol=(id)=>{
        dispatch(followUser(id))
    }
    const unflwcontrol=(id)=>{
        dispatch(unfollowUser(id))
    }
    return (
        <>
            <Container maxWidth='sm' className='border' style={{ marginTop: '56px' }}>

                <div className='d-flex flex-wrap'>
                    {
                        alluser ? (
                            alluser.map((user) => {
                                return (
                                    <div className={classes.dabba}>
                                        <Link to={`/profile/${user._id}`} style={{textDecoration:'none'}}>
                                            <span>{user.name}</span>
                                            <img className={classes.img} src={user.profilePic?(''):fp} alt="" />
                                        </Link>
                                        <div style={{ position: 'absolute', bottom: 0, textAlign: 'center' }}>
                                            
                                            {
                                                user.follwers.includes(userDetail._id)?
                                             (
                                             <Button style={{marginLeft:'10px'}} color='primary' onClick={()=>unflwcontrol(user._id)}>
                                                 Unfollow
                                             </Button>
                                             )
                                             :
                                             (
                                                <Button style={{marginLeft:'10px'}} color='primary' onClick={()=>flwcontrol(user._id)}>
                                                Follow
                                            </Button>
                                            )
                                             
                                            }
                                           
                                            </div>
                                    </div>
                                )
                            })
                        ) : ('')
                    }
                </div>
            </Container>
        </>
    )
}

export default Discover
