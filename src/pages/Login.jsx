import React, { useContext } from "react";
import { MyButton } from "../components/UI/button/MyButton";
import { MyInput } from "../components/UI/input/MyInput";
import { AuthContext } from "../context";

export const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    
    const login = event => {
        event.preventDefault()
        setIsAuth(true)
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1>Page of Login</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder='Writing Login'></MyInput>
                <MyInput type='password' placeholder='Writing Password'></MyInput>
                <MyButton>Edit</MyButton>
            </form>
        </div>
    )
}