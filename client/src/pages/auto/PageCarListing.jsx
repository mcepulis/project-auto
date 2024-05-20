import { useContext, useEffect } from 'react';
import { AutoCard } from '../../components/auto-list/AutoCard';
import { GlobalContext } from '../../context/GlobalContext';

export function PageCarListing() {
    const { allCars, updateAllCars } = useContext(GlobalContext);

    useEffect(() => {
        fetch('http://localhost:4821/api/cars/all')
            .then(res => res.json())
            .then(data => {
                if (data.type === 'success') {
                    updateAllCars(data.list);
                }

                if (data.type === 'error') {
                    console.error(data.message);
                }
            })
            .catch(console.error);
    }, []);

    return (
        <>
            <section className="container">
                <h1>Cars for sale</h1>
            </section>
            <section className="container">
                <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                    {allCars.map(car => <AutoCard key={car.id} data={car} />)}
                </div>
            </section>
        </>
    )
}