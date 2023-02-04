import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {auth} from '../firebase.config';


const Home = () => {
    const navigate = useNavigate()
    const googleSignIn = async () =>{
        try { 
            const provider = new GoogleAuthProvider()
            const userCredential = await signInWithPopup(auth, provider)

            if (userCredential) {
                navigate('/chat')
            }
        } catch (error) {
            console.log('Something went wrong!')
        }      
    }
    

    return ( 
        <>
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <div className="card-body">
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="text" placeholder="email" className="input input-bordered" disabled />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="text" placeholder="password" className="input input-bordered" disabled />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                    </div>
                        <div className="form-control mt-6">
                        <button className="btn btn-primary mb-2" disabled>Login</button>
                        
                        <button className="btn btn-primary" onClick={()=>googleSignIn()}>Login with google</button> 
                        
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>
     );
}
 
export default Home;