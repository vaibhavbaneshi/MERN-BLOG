import { Button, Label, TextInput, Alert, Spinner } from 'flowbite-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import OAuth from '../components/OAuth'

function SignUp() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({})

  const {loading, error: errorMessage} = useSelector((state) => state.user)

  const dispatch = useDispatch()

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim()})
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the required fields"))
    }
    
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if(data.success === false) {
        dispatch(signInFailure(data.message))
      }

      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/signin')
      }

    } catch (error) {
      dispatch(signInFailure(data.message))
    }
  }

  return (
    <>
      <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row gap-5'>
          {/* Left Side div */}
          <div className='flex-1'>
            <Link to="/" className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Vaibhav's</span>
              Blog
            </Link>
            <p className='text-sm mt-5'>
              This is a demo project. You can sign-in with your email and password or with Google
            </p>
          </div>

          {/* Right Side div */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <Label value='Your Username'/>
                <TextInput type='username' placeholder='username' id="username" onChange={handleChange}/>
                <Label value='Your Email'/>
                <TextInput type='email' placeholder='example@gmail.com' id="email" onChange={handleChange}/>
                <Label value='Your Password'/>
                <TextInput type='password' placeholder='password' id="password" onChange={handleChange}/>
              </div>
              <Button gradientDuoTone="purpleToPink" type='submit' outline disabled={loading} enable="">
                {loading ? (
                  <>
                    <Spinner size='sm'/>
                    <span className='pl-3'>Loading...</span>
                  </>
                ): ('Sign Up')}</Button>
                <OAuth/>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>
                Have an account?
              </span>
              <Link to="/signin" className='text-blue-500'>
                Sign In
              </Link>
            </div>
            {
              errorMessage && (
                <Alert className='mt-5' color="failure">
                  {errorMessage}
                </Alert>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUp