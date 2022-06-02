import { request } from 'express';
import setup from '../setup.js';
import supertest from 'supertest';
import pool from '../lib/utils/pool.js'; 
import app from '../app.js';

describe('movie routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  const movie = {
    name: 'title',
    year: 1990,
    director: 'bob',
    descrption: 'description'
  };

  test('gets all movies', async () => {
    const res = await request(app)
      .get('/movies')
      .send(movie);
    expect(res.body).toEqual({ ...movie });
  });

  afterAll(() => {
    pool.end();
  });
});
