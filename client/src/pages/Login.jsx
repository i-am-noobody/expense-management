import React,{useState, useEffect} from 'react'
import {Form, Input, message} from 'antd'
import '../styles/LoginPage.css'
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../components/Spinner'

const Login = () => {
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate()
    const submitHandler=async(values)=>{
      try {
        setLoading(true)
       const {data} = await axios.post('http://localhost:4000/users/login',values)
       setLoading(false)
       message.success('Login successfully')
       localStorage.setItem('user', JSON.stringify({...data.user,password:''}))
       navigate('/')
      } catch (error) {
        setLoading(false)
        message.error('Something went wrong')
        console.log(error)
      }
    }
    //PREVENT FOR REGISTER USER
  useEffect(()=>{
    if(localStorage.getItem('user')){
      navigate('/')
    }
  },[navigate])
  return (
    <>
    {loading && <Spinner/> }
    <div className='register-page '>
    <Form layout='vertical' onFinish={submitHandler}>
    <h1>Login Form</h1>
    <Form.Item label='Email' name='email'>
    <Input type='email'/>
    </Form.Item>
    <Form.Item label='Password' name='password'>
    <Input type='password'/>
    </Form.Item>
    <div className='d-flex justify-content-between'>
    <Link to='/register'>Not a User? Click here to Register.</Link>
    </div>
    <button className='btn btn-primary mt-3'>Register</button>
    </Form>
  </div>
    </>
  )
}

export default Login
