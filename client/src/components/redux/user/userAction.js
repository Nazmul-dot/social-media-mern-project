import {
    REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS,
    REQUEST_FAIL, USER_LOGGED
} from './userType'
import axios from 'axios'
export const userRegister = (regisData) => {
    return async dispatch => {
        // alert('userRegister')
        try {
            const result = await axios.post('/register', regisData)
            // console.log(result)
            dispatch({ type: REGISTER_SUCCESS, payload: result.data })
            // alert('register')
            localStorage.setItem('token',JSON.stringify(result.data.token))
        } catch (error) {
            dispatch({ type: REQUEST_FAIL, payload: error.message })
        }
    }
}

export const UserLogin = (loginData) => {
    return async dispatch => {
        // alert('loginData')
        try {
            const result = await axios.post('/login', loginData)
            // console.log(result)
            dispatch({ type: LOGIN_SUCCESS, payload: result.data })
            // alert('login')
            localStorage.setItem('token',JSON.stringify(result.data.token))
        } catch (error) {
            dispatch({ type: REQUEST_FAIL, payload: error.message })
        }
    }
}

export const userLogged = () => {
    return async dispatch => {
        try {
            // alert('logged1')
            const result = await axios.get('/logged')
            // console.log(result)
            dispatch({ type: USER_LOGGED, payload: result.data })
            // alert('logged')
        } catch (error) {
            dispatch({ type: REQUEST_FAIL, payload: error.message })
        }
    }
}

export const userLogout = () => {
    return async dispatch => {
        try {
            const result = await axios.get('/logout')
            dispatch({ type: LOGOUT_SUCCESS, payload: result.data })
            localStorage.removeItem('token')
        } catch (error) {
            dispatch({ type: REQUEST_FAIL, payload: error.message })
        }
    }
}
