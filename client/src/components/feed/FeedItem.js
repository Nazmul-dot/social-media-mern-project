import {
    Box, Container, Grid, Toolbar, Hidden, Paper, Avatar,
    Typography, Collapse, List, ListItem, ListItemText, ListItemAvatar,
    TextField, InputBase, IconButton, Menu, MenuItem
} from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import SendIcon from '@material-ui/icons/Send';
import test_image from '../image/download (23).jpg'
import { useSelector, useDispatch } from 'react-redux'
import { likeTogole, addComment } from '../redux/post/postAction'
const useStyle = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        marginBottom: theme.spacing(5)
    },
    post_header: {
        display: 'flex',
        // paddingTop: theme.spacing(2),
        // paddingLeft: theme.spacing(1)
    },
    small: {
        width: theme.spacing(4),
        height: theme.spacing(4),
    },
    image_box: {
        maxWidth: '100%',
        border: "2px solid red",
        marginTop: '10px',
        marginBottom: '10px'
        // maxHeight:'500px'
    },
    img: {
        maxWidth: '100%',
        objectFit: "cover"
    },
    textfild: {
        borderRadius: theme.spacing(2)
    }
}))
const FeedItem = ({ item }) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const [open, setopen] = useState(false)
    const comment = () => {
        setopen(!open)
    }

    const [AnchorE1, setAnchorE1] = useState(null)
    const openMenu = (e) => {
        setAnchorE1(e.currentTarget)
    }
    const closeMenu = () => {
        setAnchorE1(null)
    }
    const customMenu = (
        <Menu
            anchorEl={AnchorE1}
            keepMounted
            open={Boolean(AnchorE1)}
            onClose={closeMenu}
        >
            <MenuItem onClick={closeMenu}>Edit</MenuItem>
            <MenuItem onClick={closeMenu}>delete</MenuItem>
        </Menu>
    )
    const likeRevers = (id) => {
        dispatch(likeTogole(id))
    }
    const [commentText, setcommentText] = useState({
        cmnt: ''
    })
    const {cmnt}=commentText
    const submit = (id) => {
        console.log(cmnt)
        // alert(commentText.comment)
        // var data=commentText.text
        // console.log(data)
        dispatch(addComment({cmnt,id}))
        setcommentText({
            cmnt: ''
        })
    }
    return (
        <>
            <Box >
                <Paper elevation={3} className={classes.paper}>
                    <Box className={classes.post_header}>
                        <Avatar className={classes.small}>{<PermIdentityIcon />}</Avatar>
                        <Typography variant='body1' style={{ marginLeft: '15px', marginTop: '5px' }}>{item.author}</Typography>
                        <Typography variant='subtitle2' style={{ marginLeft: '15px', marginTop: '6px' }}>18 min ago</Typography>
                        <IconButton style={{ marginLeft: 'auto' }} onClick={openMenu}><MoreVertIcon /></IconButton>
                    </Box>
                    {customMenu}
                    <Box mt={3}>
                        <Typography>{item.text}</Typography>
                    </Box>
                    <Box className={classes.image_box}>
                        <img
                            style={{ width: "100%", maxHeight: '500px', objectFit: 'fill' }}
                            src={item.postImage}
                        />
                    </Box>
                    <div className='d-flex'>
                        <ThumbUpAltIcon onClick={() => likeRevers(item._id)} style={{ backgroundColor: '#1E90FF', borderRadius: '50%', padding: '3px', cursor: 'pointer', color: 'white' }} />
                        <Typography style={{ marginLeft: '10px' }} >{item.number_likes} pepole like it</Typography>
                        <Typography style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={comment}>comment {item.number_comments}</Typography>
                    </div>
                    <Collapse in={open}>
                        <List>
                            {
                                item.comments ? (
                                    item.comments.map((comnt) => {
                                        return (
                                            <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <Avatar>N</Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    <Box>
                                                        <Typography variant='h6'>{comnt.commenterName}</Typography>
                                                        {/* <Typography variant='subtitle2'>{`${comnt.timestamp.getDate()}`}</Typography> */}
                                                    </Box>
                                                    <Typography>
                                                        {
                                                            comnt.commentText
                                                        }
                                               </Typography>
                                                </ListItemText>
                                            </ListItem>
                                        )
                                    })
                                ) : ('')
                            }


                        </List>
                        <Container className='d-flex'>
                            <Box component='form' className='d-flex'>
                                <Box style={{ flexGrow: 1 }}>
                                    <TextField
                                        variant='filled'
                                        fullWidth
                                        multiline
                                        size='small'
                                        value={commentText.cmnt}
                                        onChange={(e) => setcommentText({ ...commentText, ['cmnt']: e.target.value })}
                                    />
                                </Box>
                            </Box>
                            <Box >
                                <IconButton>
                                    <SendIcon style={{ color: '#1E90FF' }} onClick={()=>submit(item._id)} />
                                </IconButton>
                            </Box>
                        </Container>

                    </Collapse>
                    {/* {customMenu} */}
                </Paper>
            </Box>
        </>
    )
}

export default FeedItem
