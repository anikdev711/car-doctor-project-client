import { useLoaderData } from "react-router-dom";














//Ignore this file, and use BookService file instead of it














const CheckOut = () => {
    const service = useLoaderData();
    // console.log(service);
    const { title } = service;
    return (
        <div>
            <h2 className="text-3xl text-center">Book services: {title}</h2>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" placeholder="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" placeholder="password" className="input input-bordered" required />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary btn-block text-white font-bold" type="submit" value="Order Confirm" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;