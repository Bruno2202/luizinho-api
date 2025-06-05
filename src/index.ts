import { fastify } from 'fastify'
import fastifyCors from "@fastify/cors";
import brandRoute from './routes/brand.route';
import categoryRoute from './routes/category.route';
import cityRoute from './routes/city.route';
import colorRoute from './routes/color.route';
import modelRoute from './routes/model.route';
import typeRoute from './routes/type.route';
import stateRoute from './routes/state.route';
import transmissionRoute from './routes/transmission.route';
import clientRoute from './routes/client.route';
import carRoute from './routes/car.route';
import fuelRoute from './routes/fuel.route';
import purchaseRoute from './routes/purchase.route';
import saleRoute from './routes/sale.route';
import movementRoute from './routes/movement.route';
import storeRoute from './routes/store.route';

const server = fastify();

server.register(fastifyCors, {
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
});

server.register(brandRoute);
server.register(categoryRoute);
server.register(cityRoute);
server.register(colorRoute);
server.register(modelRoute);
server.register(stateRoute);
server.register(typeRoute);
server.register(transmissionRoute);
server.register(clientRoute);
server.register(carRoute);
server.register(fuelRoute);
server.register(purchaseRoute);
server.register(saleRoute);
server.register(movementRoute);
server.register(storeRoute);

server.listen({
    port: 3000,
    host: '0.0.0.0'
}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server running at ${address} 🚀`);
});