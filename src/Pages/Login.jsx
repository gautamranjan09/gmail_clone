import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { BiLoader } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/appSlice";
import Card from "../components/UI/Card";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
    };
    const signinWithGoogle = async () => {
        setIsLoading(true);
        
        try{
          const result = await signInWithPopup(auth, provider);
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const  token = credential.accessToken;
  
          // The signed-in user info.
          const user = result.user;
          const createdAtTimeStamp = Number(user.metadata.createdAt);
          const lastLoginAtTimeStamp = Number(user.metadata.lastLoginAt);
          const loggedInUser = {
            displayName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            token: user.accessToken,
            id: user.uid,
            createdAt: new Date(createdAtTimeStamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
            lastLoginAt: new Date(lastLoginAtTimeStamp).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
          }
          toast.success("User Authenticated!");
          dispatch(setUser(loggedInUser));
          console.log(user, loggedInUser);
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          toast.error(errorMessage);
        } finally{
          setIsLoading(false);
        }
      };

  return (
    <Card>
      {/* Sign in form */}
      <div className="w-full max-w-md p-8 rounded-xl relative z-10 mx-4 backdrop-blur-3xl bg-white/10 border border-white/70 shadow-xl animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-transparent to-white/10 rounded-xl -z-10"/>

        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-700">Sign in to Mail Hub</h2>
            <p className="text-slate-400 mt-2">Welcome back! Please enter your details</p>
        </div>

        <div className="mb-6">
            <button onClick={signinWithGoogle} className="w-full flex items-center justify-center gap-3 px-4 py-2.5 text-sm font-medium text-teal-500 bg-white hover:text-white hover:bg-gradient-to-r hover:from-rose-300 hover:to-teal-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-colors duration-500">
             {isLoading ? ( <><BiLoader className="w-5 h-5 animate-spin" />Loading...</> ) 
             : ( <>
                <img src="https://mailmeteor.com/logos/assets/PNG/Gmail_Logo_512px.png" alt="Google" className="w-5 h-4" />
                Continue with Google
                </>)}
            </button>
        </div>
        <div className="relative flex items-center justify-center mb-6">
            <div className="border-t border-gray-300 w-full"/>
            <div className="bg-white px-4 text-sm text-gray-500">or</div>
            <div className="border-t border-gray-300 w-full"/>
        </div>
        <form onSubmit={handleSubmit} >
            <div className="relative animate-slideIn">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block mb-5 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute text-sm text-gray-500 duration-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Email
                </label>
            </div>
            <div className="relative animate-slideIn">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 peer"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute text-sm text-gray-500 duration-500 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-teal-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  Password
                </label>
            </div>
            <div className="flex items-center justify-end mb-6">
                <button onClick={() => navigate("/forgotpassword") } type="button" className="text-sm text-teal-400 hover:text-teal-500 font-medium transition-colors duration-200">Forgot password?</button>
            </div>

            <div className="flex flex-col space-y-4 animate-slideIn">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-teal-400 to-rose-400 hover:from-teal-300 hover:to-rose-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 shadow-md transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                      <><BiLoader className="w-4 h-4 animate-spin mr-2" />Loading...</>
                      ) : 'Sign in'}
                </button>
                <button
                  type="button"
                  onClick={()=> navigate("/signup")}
                  className="w-full px-4 py-2.5 text-sm font-medium text-teal-600 hover:text-white bg-white hover:bg-gradient-to-r hover:from-rose-300 hover:to-teal-300 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400/50 transition-all duration-500"
                >
                  Create an account
                </button>
            </div>
        </form>
      </div>
    </Card>
  );
};

export default Login;
