import { Box, Container, Grid, Toolbar, Hidden, Paper, Avatar, Typography, Collapse } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FeedItem from './FeedItem';
import FeedInput from './FeedInput';
import { useDispatch, useSelector } from 'react-redux'
const useStyle = makeStyles((theme) => ({

}))
const Feed = ({ timelinePost, currentUserId }) => {
    // console.log(timelinePost)
    const { userDetail } = useSelector(state => state.userData)
    const [post, setpost] = useState([])
    useEffect(() => {
        const sortdata = () => {
            setpost(
                timelinePost.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
            );
        }
        sortdata()
    }, [timelinePost])
    console.log(post)
    const classes = useStyle()
    return (
        <>
            {/* style={{ flex: 3, height: '100vh', position: 'fiexd', top: '50px', overflowY: 'scroll' }} */}
            <Container maxWidth='lg' className='border'>
                <Toolbar />
                <Grid container >
                    {/* <Hidden smDown>
                        <Grid item md={3} className='border mx-auto'>
                            <Box style={{ position: 'fixed' }}>
                                left side
                        </Box>
                        </Grid>
                    </Hidden> */}
                    <Grid container item xs={12} md={5} className='border mx-auto'>
                        <div className='row mx-auto'>
                            {
                                currentUserId === userDetail._id ? (
                                    <div className='col-12'>
                                        <FeedInput />
                                    </div>
                                ) : ('')
                            }

                            {/* <div className='col-12'>
                                <FeedInput />
                            </div> */}
                            <div className='col-12'>
                                {
                                    post ? (
                                        post.map((item) => {
                                            return (
                                                <FeedItem
                                                    item={item}
                                                />
                                            )
                                        })
                                    ) : ('')
                                }
                            </div>
                        </div>
                    </Grid>
                    {/* <Hidden smDown>
                        <Grid item md={3} mx-auto className='border mx-auto '>
                            <Box style={{ position: 'fixed' }} >
                                right side
                        </Box>
                        </Grid>
                    </Hidden> */}
                </Grid>
            </Container>
        </>
    )
}

export default Feed

