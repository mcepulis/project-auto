import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/GlobalContext';
import { Alert } from '../../components/alert/Alert';

export function PageLogin() {
    const { updateLoginStatus, updateUserId } = useContext(GlobalContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [responseText, setResponseText] = useState('');
    const [responseType, setResponseType] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handlePasswordVisibility() {
        setPasswordVisible(!isPasswordVisible);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (email === '' || password === '') {
            setResponseType('error');
            setResponseText('Blogi formos duomenys');
            return;
        }

        fetch('http://localhost:4821/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password }),
        })
            .then(res => res.json())
            .then(data => {
                setResponseText(data.message);
                setResponseType(data.loggedIn ? 'success' : 'error');

                if (data.loggedIn === true) {
                    updateLoginStatus(true);
                    updateUserId(data.userId);
                    navigate('/account');
                }
            })
            .catch(err => {
                console.log(err);
                setResponseType('error');
                setResponseText('Kritine klaida bandant prisijungti is kliento puses');
            });
    }

    return (
        <main className="container">
            <div className="row">
                <form onSubmit={handleFormSubmit} className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 col-xxl-4 offset-xxl-4">
                    <h1 className="h3 mb-3 fw-normal">Please login</h1>

                    <Alert type={responseType} text={responseText} />

                    <div className="form-floating">
                        <input type="email" onChange={handleEmailChange} value={email} className="form-control" id="floatingInput" placeholder="name@example.com" />
                        <label htmlFor="floatingInput">Email address</label>
                    </div>
                    <div className="input-group form-floating">
                        <input type={isPasswordVisible ? 'text' : 'password'} onChange={handlePasswordChange} value={password} className="form-control" id="floatingPassword" placeholder="Password" />
                        <label htmlFor="floatingPassword">Password</label>
                        <div className="invalid-feedback">
                            Your username is required.
                        </div>
                        <span onClick={handlePasswordVisibility} className="input-group-text">{isPasswordVisible ? 'V' : 'X'}</span>
                    </div>

                    {/* <div className="form-check text-start my-3">
                        <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                            Remember me
                        </label>
                    </div> */}
                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Login</button>
                </form>
            </div>
        </main>
    );
}
