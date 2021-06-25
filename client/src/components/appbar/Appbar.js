import React from 'react'
import { Container,AppBar, Toolbar,Typography } from '@material-ui/core'
const Appbar = () => {
    return (
        <>
            <Container maxWidth='xl'>
                <Appbar>
                    <Toolbar>
                        <Typography variant='h6'>@nazmul</Typography>
                    </Toolbar>
                </Appbar>
            </Container>
        </>
    )
}

export default Appbar
