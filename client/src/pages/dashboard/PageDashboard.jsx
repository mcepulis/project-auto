import { Link } from "react-router-dom";

export function PageDashboard() {
    return (
        <div className="container">
            <div className="row">
                <h1 className="col-12">Account dashboard</h1>
            </div>
            <div className="row">
                <div className="col-12">
                    <Link className="btn btn-primary" to="/account/my-auto-list">View your cars</Link>
                    <Link className="btn btn-primary mx-3" to="/account/my-auto-list/create">Create new car</Link>
                </div>
            </div>
        </div>
    );
}
