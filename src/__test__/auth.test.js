import request from 'supertest';
import app from '../../app.js';
import { describe, it, expect } from '@jest/globals';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../../models/user.model.js';
import { postUser, loginUser } from '../../controllers/user.controllers.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

describe('POST /api/user/login', () => {
    it('should login a user', async () => {
        const user = new User({
        nombre: 'Test User',
        email: 'test@example.com',
        password: 'password'
        });

        await user.save();

        const res = await request(app)
        .post('/api/user/login')
        .send({ email: user.email, password: 'password' })
        .expect(200);

        expect(res.body.token).toBeDefined();

        await User.deleteMany({});
    });

    it('should return unauthorized if password is incorrect', async () => {
        const user = new User({
        nombre: 'Test User',
        email: 'test@example.com',
        password: 'password'
        });

        await user.save();

        const res = await request(app)
        .post('/api/user/login')
        .send({ email: user.email, password: 'wrong-password' })
        .expect(401);

        expect(res.body.message).toEqual('Invalid Credentials');

        await User.deleteMany({});
    });

    it('should return unauthorized if user does not exist', async () => {
        const res = await request(app)
        .post('/api/user/login')
        .send({ email: 'nonexistent@example.com', password: 'password' })
        .expect(401);

        expect(res.body.message).toEqual('Invalid Credentials');
    });
});

    describe('Middleware auth', () => {
    it('should return unauthorized if no token is provided', async () => {
        const res = await request(app)
        .get('/api/contenido')
        .expect(401);

        expect(res.body.message).toEqual('Access Denied');
    });

    it('should return unauthorized if token is invalid', async () => {
        const token = jwt.sign({ id: '123' }, 'wrong-secret-key', { expiresIn: '1h' });

        const res = await request(app)
        .get('/api/contenido')
        .set('Authorization', `Bearer ${token}`)
        .expect(401);

        expect(res.body.message).toEqual('Invalid Token');
    });

    it('should return the user if token is valid', async () => {
        const user = new User({
        nombre: 'Test User',
        email: 'test@example.com',
        password: 'password'
        });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });

    const res = await request(app)
        .get('/api/contenido')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

    expect(res.body.user._id).toEqual(user._id.toString());

    await User.deleteMany({});
    });
});