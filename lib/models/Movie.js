import pool from '../utils/pool.js';

export default class Movie {
  id;
  name;
  year;
  director;
  descrption;

  constructor(rows) {
    this.id = rows.id;
    this.name = rows.name;
    this.year = rows.year;
    this.director = rows.director;
    this.description = rows.description;
  }

  static async create ({ name, year, director, description }) {
    const { rows } = await pool.query(`
      INSERT INTO movies (name, year, director, description)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [name, year, director, description]);

    return new Movie(rows[0]);
  }

  static async getMovies() {
    const { rows } = await pool.query(`
      SELECT * FROM movies
    `);
    return rows;
    // return rows.map(row => new Movie(row));
  }

  static async getAll() {
    const { rows } = await pool.query(`
    SELECT m.*, c.name AS category 
    FROM movies AS m
    INNER JOIN movies_categories AS mc
    ON m.id = mc.movies_id
    INNER JOIN categories AS c
    ON c.id = mc.categories_id
  `);

    const uniqueTitle = [];
    for(let i = 0; i < rows.length; i++) {
      const curr = rows[i];
      const uniqueName = uniqueTitle.find(n => n.id === curr.id);
      if(!uniqueName) {
        uniqueTitle.push(curr);
      } else {
        uniqueName.category = uniqueName.category + ', ' + curr.category;
      }
    }
    console.log(uniqueTitle, 'uniqueTitle');
    return uniqueTitle;
  }

  static async findByCat(category) {
    const cat = category.toLowerCase();
    const { rows } = await pool.query(`
      SELECT m.*, c.name AS category 
      FROM movies AS m
      INNER JOIN movies_categories AS mc
      ON m.id = mc.movies_id
      INNER JOIN categories AS c
      ON c.id = mc.categories_id
      WHERE lower(c.name) like $1
    `, [cat]);

    return rows;
  }
  
}
