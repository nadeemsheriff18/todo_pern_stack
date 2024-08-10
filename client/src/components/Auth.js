import React, { useState } from 'react'
import {useCookies} from 'react-cookie';

const Auth = () => {
    const [cookies, setCookie, removeCookie] =useCookies(null)
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError]=useState(null)
    const [email, setEmail]=useState(null)
    const [password, setPassword]=useState(null)
    const [confirmPassword, setConfirmPassword]=useState(null)

console.log(cookies)

    const viewLogin=(status)=>{
        setIsLogin(status)
        setError(null)
    }

    const handleSubmit= async (e, endpoint)=>{
        e.preventDefault()
        if(!isLogin && password!==confirmPassword){
            setError('Passwords do not match')
            return
        }

        const response = await fetch(`http://localhost:3001/${endpoint}`,{
            method:'POST',
            headers:{'Content-Type':'application/json' },
            body:JSON.stringify({email,password})
        })
        const data = await response.json()
        //console.log(data)
        if(data.detail){
            setError(data.detail)
        }else{
            setCookie('Email', data.email)
            setCookie('AuthToken',data.token)

            window.location.reload()
        }
    }
  return (
    <div>
        <div style={{height:isLogin? "300px":"350px"}}>
            <form className='flex flex-col justify-center items-center p-2 gap-3'>
                 <h2 className='text-2xl font-bold font-sans'>{isLogin ? 'Please Log in' : 'Please sign up!'}</h2>
                <input type='email' placeholder='Enter your Email' onChange={(e) => setEmail(e.target.value)} className='placeholder:text-center text-xl border-2 rounded-xl py-1 px-2'/>
                <input type='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} className='placeholder:text-center text-xl border-2 rounded-xl py-1 px-2'/>
                {!isLogin && <input type='password' placeholder='confirm password' onChange={(e)=> setConfirmPassword(e.target.value)} className='placeholder:text-center text-xl border-2 rounded-xl py-1 px-2' /> }
                <input type='submit' className='placeholder:text-center text-xl border-2 rounded-xl py-1 px-2 bg-blue-300 cursor-pointer hover:bg-blue-700' onClick={(e)=> handleSubmit(e, isLogin ? 'login' : 'signup')}/>
                {error && <p>{error}</p>}
            </form>
            <div className='flex mt-12 mx-2 gap-2'>
                <button onClick={()=> viewLogin(false)}
                className='text-xl rounded-lg p-2'
                style={{backgroundColor: !isLogin? '#07A417':'rgb(188,188,188)'}}
                >Sign Up</button>
                <button onClick={()=> viewLogin(true)}
                className='text-xl rounded-lg p-2'
                style={{backgroundColor: isLogin? '#07A417':'rgb(188,188,188)'}}
                >Login</button>
            </div>
        </div>
    </div>
  )
}

export default Auth