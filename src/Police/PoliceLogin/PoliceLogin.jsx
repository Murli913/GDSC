import React from "react";
import { auth, fireDb } from "../../firebase/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const PoliceLogin = () => {
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const user = result.user;
       // console.log(data, "authData");
        const userDetails = {
          displayName: "Police",
          email: user.email,
          userid: user.uid,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };


          // Save user details to Firestore under 'users' collection
      const userRef = doc(fireDb, "users", user.uid);
      setDoc(userRef, userDetails)
        .then(() => {
          localStorage.setItem("current user uid", user.uid);
          localStorage.setItem("isAuth", true);
          toast.success('Login success');
          history("/policehome");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          toast.error('Error occurred during login');
        });
        
      });
    };

  const handleReset = () => {
    history("/policereset");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="data:image/png;base64,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" alt="Logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign In
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <p className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer" onClick={handleReset}>
                Forgot your password?
              </p>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PoliceLogin;
