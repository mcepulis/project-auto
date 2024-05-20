import { useState } from 'react';
import { Alert } from '../../components/alert/Alert';

export function PageRegister() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repass, setRepass] = useState('');
    const [responseText, setResponseText] = useState('');
    const [responseType, setResponseType] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleRepassChange(e) {
        setRepass(e.target.value);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (email === '' || password === '' || repass === '' || password !== repass) {
            console.error('ERROR: blogi formos duomenys');
            return;
        }

        fetch('http://localhost:4821/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                setResponseType(data.type);
                setResponseText(data.message);
            })
            .catch(err => {
                console.log(err);
                setResponseType('error');
                setResponseText('Kritine klaida bandant registruotis is kliento puses');
            });
    }

    return (
        <main className="container">
            <div className="row">
                <form onSubmit={handleFormSubmit} className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 col-xxl-4 offset-xxl-4">
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>

                    <Alert type={responseType} text={responseText} />

                    <div className="form-floating">
                        <input type="email" onChange={handleEmailChange} value={email} className="form-control" id="register_username" placeholder="name@example.com" />
                        <label htmlFor="register_username">Email address</label>
                        <div className="invalid-feedback">
                            Your username is required.
                        </div>
                    </div>
                    <div className="form-floating">
                        <input type="password" onChange={handlePasswordChange} value={password} className="form-control" id="register_password" placeholder="Password" />
                        <label htmlFor="register_password">Password</label>
                        <div className="invalid-feedback">
                            Your username is required.
                        </div>
                    </div>
                    <div className="form-floating">
                        <input type="password" onChange={handleRepassChange} value={repass} className="form-control" id="register_repass" placeholder="Password" />
                        <label htmlFor="register_repass">Repeat password</label>
                        <div className="invalid-feedback">
                            Your username is required.
                        </div>
                    </div>

                    {/* <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div> */}
                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Register</button>
                </form>
            </div>
        </main>
    );
}
