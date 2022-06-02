import Router from 'express';
import Movie from '../models/Movie.js';

export default Router() 
  .get('/', (req, res, next) => {
    Movie.getMovies()
      .then(mov => res.send(mov))
      .catch(next);
  })

  .get('/mc', (req, res, next) => {
    Movie.getAll()
      .then(mov => res.send(mov))
      .catch(next);
  })

  .get('/catfilter', (req, res, next) => {
    Movie.findByCat(req.query.category)
      .then(mov => res.send(mov))
      .catch(next);
  });
