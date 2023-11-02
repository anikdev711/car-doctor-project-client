import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const BookService = () => {
    const service = useLoaderData();
    // console.log(service);
    const { user } = useContext(AuthContext);
    const { title, _id, price, img } = service;

    const handleBookService = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = user?.email;
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking);

        fetch('https://car-doctor-project-server-v2.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.insertedId){
                    alert('data inserted successfully')
                }
            })
    }


    return (
        <div>
            <h2 className="text-3xl text-center">Book services: {title}</h2>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleBookService}
                            className="card-body">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={user?.displayName}
                                        className="input input-bbookinged" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Date</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        className="input input-bbookinged" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        defaultValue={user?.email}
                                        placeholder="email"
                                        className="input input-bbookinged" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Price</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="price"
                                        defaultValue={'$' + price}
                                        className="input input-bbookinged" required />
                                </div>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-primary btn-block text-white font-bold" type="submit" value="booking Confirm" />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookService;