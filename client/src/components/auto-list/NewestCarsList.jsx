import { useContext, useEffect } from 'react';
import { AutoCard } from './AutoCard';
import { GlobalContext } from '../../context/GlobalContext';

export function NewestCarsList() {
    const { newestCars, updateNewestCars } = useContext(GlobalContext);

    useEffect(() => {
        if (newestCars.length === 0) {
            fetch('http://localhost:4821/api/cars/newest')
                .then(res => res.json())
                .then(data => updateNewestCars(data.list))
                .catch(console.error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newestCars]);

    return (
        <section className="container">
            <h1>Newest cars for sale</h1>
            <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-3">
                {newestCars.map(car => <AutoCard key={car.id} data={car} />)}
            </div>
        </section>
    );
}
