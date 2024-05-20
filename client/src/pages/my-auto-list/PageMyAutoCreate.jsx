import { useContext, useState } from 'react';
import { Alert } from '../../components/alert/Alert';
import { GlobalContext } from '../../context/GlobalContext';
import style from './PageMyAutoCreate.module.css';
import carDefaultImg from '../../assets/car-default.png';

export function PageMyAutoCreate() {
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [responseText, setResponseText] = useState('');
    const [responseType, setResponseType] = useState('');
    const { addMyNewCar } = useContext(GlobalContext);

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handlePriceChange(e) {
        setPrice(e.target.value);
    }

    function handleImageChange(e) {
        const formData = new FormData();
        formData.append('car_image', e.target.files[0]);

        fetch('http://localhost:4821/api/upload/car', {
            method: 'POST',
            credentials: 'include',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                if (data.type === 'success') {
                    setImage(data.imgPath);
                }
            })
            .catch(console.err);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (name === '' || price === '') {
            setResponseType('error');
            setResponseText('Blogi formos duomenys');
            return;
        }

        fetch('http://localhost:4821/api/cars/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ name, price: +price, image }),
        })
            .then(res => res.json())
            .then(data => {
                setResponseType(data.type);
                setResponseText(data.message);

                if (data.type === 'success') {
                    addMyNewCar(data.car);
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <section className="container">
            <div className="row">
                <h1 className="col-12">Create new car</h1>
            </div>
            <div className="row">
                <form onSubmit={handleFormSubmit} className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 col-xxl-4 offset-xxl-4">
                    <Alert type={responseType} text={responseText} />

                    <div className="form-floating">
                        <input type="text" onChange={handleNameChange} value={name} className="form-control" id="name" placeholder="Auto" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" onChange={handlePriceChange} value={price} className="form-control" id="price" placeholder="99" />
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="form-floating">
                        <img src={image ? image : carDefaultImg} alt="Car photo" className={style.carImg} />
                        <input onChange={handleImageChange} type="file" id="image" />
                    </div>

                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Create</button>
                </form>
            </div>
        </section>
    );
}
