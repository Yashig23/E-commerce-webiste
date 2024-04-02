import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import MyContext from '../../context/data/MyContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
function Signup() {

    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const [error, setError] = useState('')

    const context = useContext(MyContext);
    const {loading, setLoading} = context;
    const navigate = useNavigate();

    const signUp =async ()=>{
        if(name==="" || email==="" || password===""){
           setError('Fill all the fields')
           return toast.error("All fileds are required")
        }
        else{
        try{
            const users = await createUserWithEmailAndPassword(auth, email, password)
             console.log(users)
             setLoading(true);

             const user={
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    'en-US',
                    {
                        month: 'short',
                        day: '2-digit',
                        year: 'numeric'
                    }
                )
             }

             
             toast.success("Sucessfully signed in")
             setLoading(false)
             setName('');
             setEmail("");
             setPassword("");
             navigate ('/login')
             const userRef = collection(fireDB, 'user')
             await addDoc(userRef, user)
            
        }catch(error){
             console.log(error)
             setLoading(false)
        }
    }
    }

    return (
        
        <div className=' flex justify-center items-center h-screen'>
            {loading && <Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <div>
                    <input type="text"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        name='name'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Username'
                    />
                </div>
                <div>
                    <input type="email"
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                        name='email'
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                        type="password"
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                    onClick={signUp}
                        className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                        Signup
                    </button>
                </div>
                <div className="text-red-400 font-bold">
                    {error}
                </div>
                <div>
                    <h2 className='text-white'>Have an account <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup