import request from 'supertest';
import app from '../../app.js';
import { describe, it, expect } from '@jest/globals';
import { hashSync, genSaltSync, compareSync } from 'bcryptjs';
import User from '../../models/user.model.js';
import { postUser } from '../../controllers/user.controllers.js';

describe('POST /api/user', () => {
    it('should create a new user', async () => {
        const user = {
            nombre: 'Test User',
            email: 'test@example.com',
            password: 'password'
        };

        const hashedPassword = hashSync(user.password, genSaltSync(10));
        user.password = hashedPassword;

        const newUser = new User(user);
        await newUser.save();

        const res = await request(app)
            .post('/api/user')
            .send(user)
            .expect(201);

        expect(res.body.nombre).toEqual(user.nombre);
        expect(res.body.email).toEqual(user.email);
        expect(res.body.password).not.toEqual(user.password);

        await User.deleteMany({});
        });
});