import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
// import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Bookings = () => {

    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure();

    // const url = `https://car-doctor-project-server-v2.vercel.app/bookings?email=${user?.email}`

    //url for custom hook useAxiosSecure
    const url = `/bookings?email=${user?.email}`

    useEffect(() => {
        //Method: fetch
        // fetch(url, {credentials: 'include'})
        //     .then(res => res.json())
        //     .then(data => {
        //         // console.log(data);
        //         setBookings(data);
        //     })

        //Method: axios
        // axios.get(url, { withCredentials: true })
        //     .then(res => {
        //         setBookings(res.data);
        //     })

        //Method: using custom hook:
        axiosSecure.get(url)
            .then(res => setBookings(res.data))





    }, [url, axiosSecure])


    const handleDelete = id => {
        const proceed = confirm('Are you sure to delete?')
        if (proceed) {
            fetch(`https://car-doctor-project-server-v2.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        alert('Deleted successfully');
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining);
                    }
                })
        }
    }

    const handleBookingConfirm = id => {
        fetch(`https://car-doctor-project-server-v2.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    //update state
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id)
                    updated.status = 'confirm';
                    const newBookings = [updated, ...remaining];
                    // console.log(newBookings);
                    setBookings(newBookings)
                }
            })
    }





    return (
        <div>
            <h2 className="text-5xl text-center mt-5 mb-5">Your bookings:{bookings.length}</h2>


            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow
                                key={booking._id}
                                booking={booking}
                                handleDelete={handleDelete}
                                handleBookingConfirm={handleBookingConfirm}
                            ></BookingRow>)
                        }
                    </tbody>


                </table>
            </div>









        </div>
    );
};

export default Bookings;