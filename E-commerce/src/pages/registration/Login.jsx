import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase/FirebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Loader from '../../components/loader/Loader'
import { useState } from 'react'
import MyContext from '../../context/data/MyContext'
import { toast } from 'react-toastify'
import { useContext } from 'react'

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const context = useContext(MyContext);
    const { loading, setLoading} = context;
   
    const signin = async()=>{
        setLoading(true);
        try{
            const result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem('user', JSON.stringify(result));
            toast.success("Signed in successfully", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
            navigate('/')
            setLoading(false)
        }catch(error){
            setLoading(false)
          toast.error('Signin Failed', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            theme: "colored"
          })
        }
            
        }
    
    return (
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input type="email"
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button onClick={signin}
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>Don't have an account <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login