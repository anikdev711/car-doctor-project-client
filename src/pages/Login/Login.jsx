import { Link, useLocation, useNavigate } from "react-router-dom";
import img from "../../assets/images/login/login.svg"
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Login = () => {

    // const { signIn } = useContext(AuthContext);
    //using custom hooks:
    const { signIn } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    // console.log(location);

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const user = {
                    email
                }
                // navigate(location?.state ? location?.state : '/');
                axios.post('https://car-doctor-project-server-v2.vercel.app/jwt', user, {
                    withCredentials: true
                })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.success) {
                            navigate(location?.state ? location?.state : '/');
                        }
                    })

            })
            .catch(error => {
                console.log(error);
            })

    }
    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="w-1/2 mr-12">
                        <img src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-3xl text-center font-bold mt-5">Login</h1>
                        <form onSubmit={handleLogin}
                            className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className="text-center my-4">New to car doctor? <Link className="text-center text-orange-500" to="/signup">Sign Up</Link> </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;