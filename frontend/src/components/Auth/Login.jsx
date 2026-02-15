import './Login.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from "js-cookie"

const Login = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const jwtToken = Cookies.get("jwtToken")    
        if (jwtToken) {
            navigate("/")
        }
    },[])

    const onChangeUsername = e => {
        setUsername(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    const onSubmitSuccess = jwtToken => {
        Cookies.set("jwtToken", jwtToken, { expires: 30 })
        navigate("/")
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const url = 'https://apis.ccbp.in/login'
            const userDetails = { username, password }
            const option = {
                method: "POST",
                body: JSON.stringify(userDetails)
            }
            const response = await fetch(url, option)
            const data = await response.json()
            if (response.ok) {
                onSubmitSuccess(data.jwt_token)
            } else {
                setErrorMessage(data.error_msg)
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="login-page">
            <div className="input-container">
                <form className="form-input-container" onSubmit={onSubmitForm}>
                    <div className='logo-vertical'>
                        <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1770441023/Frame_274_bhcyuh.png" alt="" />
                        <h1 className="logo-title">Tasty Kitchens</h1>
                    </div>
                    <h1>Login</h1>
                    <div className="input">
                        <label htmlFor="username">USERNAME</label>
                        <br />
                        <input value={username} onChange={onChangeUsername} id="username" type="text" placeholder="use rahul"/>
                    </div>
                    <div className='input'>
                        <label htmlFor="password">PASSWORD</label>
                        <br />
                        <input value={password} onChange={onChangePassword} type="password" id="password" placeholder="user rahul@2021"/>
                    </div>
                    {errorMessage && <p className='error-message'>{ errorMessage}</p>}
                    <button className="login-button" type="submit">Login</button>
                    
                </form>
            </div>
            <div className="image-container">
                <img src="https://res.cloudinary.com/dfomcgwro/image/upload/v1770441026/Rectangle_1456_ux8w57.png" alt="" />
            </div>
        </div>
    )
}

export default Login