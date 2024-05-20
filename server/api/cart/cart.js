import express from 'express';

const cartRouter = express.Router();

cartRouter.get('/', (req, res) => {
    return res.send(JSON.stringify({
        data: [
            {
                name: 'Pomidoras',
                price: 2,
                amount: 0,
            },
            {
                name: 'Agurkas',
                price: 1.5,
                amount: 0,
            },
            {
                name: 'Svogūnas',
                price: 5,
                amount: 0,
            },
        ],
    }));
});

export { cartRouter };