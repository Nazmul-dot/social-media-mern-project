import React, { useState } from 'react'
import { Avatar, Box, Button, Divider, IconButton, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import PermMediaIcon from '@material-ui/icons/PermMedia';
import CloseIcon from '@material-ui/icons/Close';
import {useDispatch,useSelector} from 'react-redux'
import {createPost} from '../redux/post/postAction'
const useStyle = makeStyles((theme) => ({
    root: {
        marginBottom: theme.spacing(5),
        // border:'2px solid black',
        width: "100%"
    },
    papar: {
        padding: theme.spacing(2),
        // border:'2px solid red'
    },
    input_box: {
        display: 'flex',
    },
    input: {
        outline: 'none',
        border: 'none',
        marginLeft: '20px',
        marginBottom: '20px',
        width:'100%'
    },
    image_box:{
        width:'100%',
        position:'relative'
        
    },
    image:{
        width:'100%',
        maxHeight:'500px',
        objectFit:'cover'
    },
    closeIcon:{
        position:'absolute',
        top:"10px",
        right:"20px"
    }
}))
const initial={
    text:'',
    image:null
}
const FeedInput = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const [data, setdata] = useState(initial)
    const handleChange=(e)=>{
        var name=e.target.name;
        var value=e.target.value;
        if(name==='image'){
            value=e.target.files[0]
        }
        setdata({...data,[name]:value})
    }
    const {text,image}=data
    const submit=(e)=>{
        e.preventDefault()
        // console.log(data)
        dispatch(createPost(data))
        setdata(initial)
    }
    return (
        <>
            <Box className={classes.root}>
                <Paper component='form' className={classes.papar}>
                    <Box className={classes.input_box}>
                        <Avatar><PermIdentityIcon /></Avatar>
                        <textarea onChange={handleChange} name='text' value={text} type="text" cols='40' rows='2' placeholder='whats your mind' className={classes.input} />
                    </Box>
                    <hr style={{ maxWidth: '400px' }} className='mx-auto' />
                    {
                        image && <>
                            <Box className={classes.image_box}>
                                <img src={URL.createObjectURL(image)} className={classes.image} alt="" />
                                <IconButton onClick={()=>setdata({...data,'image':null})} className={classes.closeIcon}>
                                     <CloseIcon style={{backgroundColor:'black',color:'white'}}  />
                                </IconButton>
                               
                            </Box>

                        </>
                    }
                    <Box className='d-flex'>
                        <label htmlFor="file" className="shareOption">
                            <PermMediaIcon htmlColor="tomato" style={{ cursor: 'pointer', marginRight: '10px' }} />
                            <span>Photo or Video</span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                accept=".png,.jpeg,.jpg"
                                onChange={handleChange}
                                name='image'
                            />
                        </label>
                        <Button style={{ marginLeft: 'auto' }} onClick={submit}>share</Button>
                    </Box>
                </Paper>
            </Box>
        </>
    )
}

export default FeedInput
