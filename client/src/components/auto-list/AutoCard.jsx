/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import style from './AutoList.module.css';

export function AutoCard({ data }) {
    const { id, name, img, price } = data;

    return (
        <article className="col">
            <div className="card shadow-sm">
                <img src={img} alt="Auto for sale" className={`bd-placeholder-img card-img-top ${style.cardImage}`} width="100%" height="225" />
                <div className="card-body">
                    <Link to={`/auto-list/${id}`}>
                        <h3>{name}</h3>
                    </Link>
                    <p className="card-text">Price: {(price / 100).toFixed(2)} Eur</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <Link to={`/auto-list/${id}`} className="btn btn-sm btn-outline-secondary">Read more</Link>
                            {/* <Link to="/auto-list/1/edit" className="btn btn-sm btn-outline-secondary">Edit</Link> */}
                        </div>
                        <small className="text-body-secondary">9 mins</small>
                    </div>
                </div>
            </div>
        </article>
    );
}
