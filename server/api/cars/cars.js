import express from 'express';
import { connection } from '../../db.js';

const carsRouter = express.Router();

carsRouter.get('/all', async (req, res) => {
    try {
        const selectQuery = `SELECT * FROM cars;`;
        const dbResponse = await connection.execute(selectQuery);

        return res.send(JSON.stringify({
            type: 'success',
            list: dbResponse[0],
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to get all cars for sale',
        }));
    }
});

carsRouter.get('/newest', async (req, res) => {
    const maxCount = 6;

    try {
        const selectQuery = `SELECT * FROM cars ORDER BY created_on DESC LIMIT ?;`;
        const dbResponse = await connection.execute(selectQuery, [maxCount]);

        return res.send(JSON.stringify({
            type: 'success',
            list: dbResponse[0],
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to get all cars for sale',
        }));
    }
});

carsRouter.get('/:carId', async (req, res, next) => {
    const { carId } = req.params;

    if (carId === 'my') {
        return next();
    }

    try {
        const selectQuery = `SELECT * FROM cars WHERE id = ?;`;
        const dbResponse = await connection.execute(selectQuery, [carId]);

        if (dbResponse[0].length === 0) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'Such car does not exist',
            }));
        }

        return res.send(JSON.stringify({
            type: 'success',
            car: dbResponse[0][0],
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to get car details',
        }));
    }
});

carsRouter.use((req, res, next) => {
    if (req.user.role === 'public') {
        return res.send(JSON.stringify({
            type: 'error',
            message: 'Login to use this API endpoint',
        }));
    }

    next();
});

carsRouter.get('/my', async (req, res) => {
    const userId = req.user.id;

    try {
        const selectQuery = `SELECT * FROM cars WHERE userId = ?;`;
        const dbResponse = await connection.execute(selectQuery, [userId]);

        return res.send(JSON.stringify({
            type: 'success',
            list: dbResponse[0],
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to get all my cars',
        }));
    }
});

carsRouter.post('/create', async (req, res) => {
    const { name, price, image } = req.body;

    try {
        const insertQuery = `INSERT INTO cars (userId, name, img, price) VALUES (?, ?, ?, ?);`;
        const dbResponse = await connection.execute(insertQuery, [req.user.id, name, image, price * 100]);

        if (dbResponse[0].affectedRows === 0) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'Car could not be created, oops (dublicate found)',
            }));
        }

        if (dbResponse[0].affectedRows === 1) {
            return res.send(JSON.stringify({
                type: 'success',
                message: 'Car created',
                car: {
                    id: dbResponse[0].insertId,
                    name,
                    price,
                    img: image,
                },
            }));
        }

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while creating car',
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to create a "car for sale"',
        }));
    }
});

carsRouter.put('/:carId', async (req, res) => {
    const { carId } = req.params;
    const { name, price, image } = req.body;
    const userId = req.user.id;

    try {
        const selectQuery = `SELECT * FROM cars WHERE id = ? AND userId = ?;`;
        const dbResponse = await connection.execute(selectQuery, [carId, userId]);

        if (dbResponse[0].length === 0) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'Such car does not exist',
            }));
        }

        if (dbResponse[0].length > 1) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'Corrupted data, sorry',
            }));
        }
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to get car details',
        }));
    }

    try {
        const updateQuery = `UPDATE cars SET name = ?, price = ?, img = ? WHERE id = ?;`;
        const dbResponse = await connection.execute(updateQuery, [name, price, image, carId]);

        if (dbResponse.affectedRows === 0) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'Critical error while trying to update car details',
            }));
        }

        if (dbResponse.affectedRows > 1) {
            return res.send(JSON.stringify({
                type: 'error',
                message: 'Car details updated, but with some unexpected side effects',
            }));
        }

        return res.send(JSON.stringify({
            type: 'success',
            message: 'Car details updated',
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to update car details',
        }));
    }
});

carsRouter.delete('/:carId', async (req, res) => {
    const { carId } = req.params;

    try {
        const deleteQuery = `DELETE FROM cars WHERE id = ?;`;
        const dbResponse = await connection.execute(deleteQuery, [carId]);

        console.log(dbResponse);

        if (dbResponse[0].affectedRows === 0) {
            return res.send(JSON.stringify({
                type: 'success',
                message: 'Could not delete car, because it does not exist',
            }));
        }

        return res.send(JSON.stringify({
            type: 'success',
            message: 'Auto deleted',
        }));
    } catch (error) {
        console.error(error);

        return res.send(JSON.stringify({
            type: 'error',
            message: 'Critical error while trying to delete car',
        }));
    }
});

export { carsRouter };