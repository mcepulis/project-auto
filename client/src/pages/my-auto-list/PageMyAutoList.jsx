import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';

export function PageMyAutoList() {
    const { myCars, deleteMyCar } = useContext(GlobalContext);

    function handleDeleteClick(carId) {
        fetch('http://localhost:4821/api/cars/' + carId, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.type === 'success') {
                    deleteMyCar(carId);
                }
            })
            .catch(console.error);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 d-flex align-items-center justify-content-between">
                    <h1>My cars for sale</h1>
                    <Link className="btn btn-primary" to="/account/my-auto-list/create">Create new car</Link>
                </div>
            </div>
            <div className="row">
                <div className="table-responsive small">
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr className="h5">
                                <th scope="col">Id</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Price</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {
                                myCars.map(car => (
                                    <tr key={car.id}>
                                        <td>{car.id}</td>
                                        <td><img src={car.img} alt="Car" style={{ height: 60 }} /></td>
                                        <td><Link to={'/auto-list/' + car.id}>{car.name}</Link></td>
                                        <td>{car.price}</td>
                                        <td>
                                            <Link className='btn btn-sm btn-primary' to={`/account/my-auto-list/${car.id}/edit`}>Edit</Link>
                                            <button className='btn btn-sm btn-danger' onClick={() => handleDeleteClick(car.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
