import { useContext, useEffect, useState } from 'react';
import { Alert } from '../../components/alert/Alert';
import { GlobalContext } from '../../context/GlobalContext';
import style from './PageMyAutoCreate.module.css';
import carDefaultImg from '../../assets/car-default.png';
import { useParams } from 'react-router-dom';

export function PageMyAutoEdit() {
    const { carId } = useParams();
    const { updateMyCar, myCars } = useContext(GlobalContext);
    const [responseText, setResponseText] = useState('');
    const [responseType, setResponseType] = useState('');
    const [car, setCar] = useState({
        id: -1,
        name: '',
        price: '',
        img: '',
    });

    useEffect(() => {
        for (const car of myCars) {
            if (car.id === +carId) {
                setCar(car);
                break;
            }
        }
    }, [myCars, carId]);

    function handleNameChange(e) {
        setCar(prev => ({ ...prev, name: e.target.value }));
    }

    function handlePriceChange(e) {
        setCar(prev => ({ ...prev, price: e.target.value }));
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
                    setCar(prev => ({ ...prev, img: data.imgPath }));
                }
            })
            .catch(console.err);
    }

    function handleFormSubmit(e) {
        e.preventDefault();

        if (car.name === '' || car.price === '') {
            setResponseType('error');
            setResponseText('Blogi formos duomenys');
            return;
        }

        fetch('http://localhost:4821/api/cars/' + car.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name: car.name,
                price: +car.price,
                image: car.img,
            }),
        })
            .then(res => res.json())
            .then(data => {
                setResponseType(data.type);
                setResponseText(data.message);

                if (data.type === 'success') {
                    updateMyCar(car);
                }
            })
            .catch(err => console.error(err));
    }

    return (
        <section className="container">
            <div className="row">
                <h1 className="col-12">Edit car: {carId}</h1>
            </div>
            <div className="row">
                <form onSubmit={handleFormSubmit} className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2 col-xl-6 offset-xl-3 col-xxl-4 offset-xxl-4">
                    <Alert type={responseType} text={responseText} />

                    <div className="form-floating">
                        <input type="text" onChange={handleNameChange} value={car.name} className="form-control" id="name" placeholder="Auto" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating">
                        <input type="number" onChange={handlePriceChange} value={car.price} className="form-control" id="price" placeholder="99" />
                        <label htmlFor="price">Price</label>
                    </div>
                    <div className="form-floating">
                        <img src={car.img ? car.img : carDefaultImg} alt="Car photo" className={style.carImg} />
                        <input onChange={handleImageChange} type="file" id="image" />
                    </div>

                    <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Update</button>
                </form>
            </div>
        </section>
    );
}
