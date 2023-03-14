import { pool } from "../db.js";

export const getRecentBooks = async (req, res) => {
  try {
    const body = await pool.query(
      "SELECT libro.*, autor.nombre AS nombre_autor, genero.nombre AS genero, serie.nombre AS serie " +
        "FROM libro " +
        "INNER JOIN autor ON libro.autorId = autor.id " +
        "INNER JOIN serie ON libro.serieId = serie.id " +
        "INNER JOIN genero ON libro.generoId = genero.id " +
        "ORDER BY anio DESC LIMIT 10;"
    );
    res.send(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getAuthors = async (req, res) => {
  try {
    const body = await pool.query("SELECT autor.id, autor.nombre FROM autor");
    res.send(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const getSeries = async (req, res) => {
  try {
    const body = await pool.query("SELECT serie.id, serie.nombre FROM serie");
    res.send(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const getGenres = async (req, res) => {
  try {
    const body = await pool.query(
      "SELECT genero.id, genero.nombre FROM genero"
    );
    res.send(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getBooksByGenre = async (req, res) => {
  try {
    const body = await pool.query(
      "SELECT libro.id, libro.nombre, libro.anio, libro.imagen, genero.nombre AS genero, autor.nombre AS nombre_autor, serie.nombre AS serie " +
        "FROM libro " +
        "INNER JOIN genero ON libro.generoId = genero.id " +
        "INNER JOIN autor ON libro.autorId = autor.id " +
        "INNER JOIN serie ON libro.serieId = serie.id " +
        "WHERE genero.nombre = ?",
      [req.params.genero]
    );
    res.send(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const getBooksBySerie = async (req, res) => {
  try {
    const body = await pool.query(
      "SELECT libro.id, libro.nombre, libro.anio, libro.imagen, serie.nombre AS serie, genero.nombre AS genero, autor.nombre AS nombre_autor " +
        "FROM libro " +
        "INNER JOIN serie ON libro.serieId = serie.id " +
        "INNER JOIN genero ON libro.generoId = genero.id " +
        "INNER JOIN autor ON libro.autorId = autor.id " +
        "WHERE serie.id = ?",
      [req.params.idSerie]
    );
    res.send(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const [body] = await pool.query(
      "SELECT libro.id, libro.nombre, libro.anio, libro.imagen, " +
        "serie.nombre AS serie, " +
        "genero.nombre AS genero, " +
        "autor.nombre AS nombre_autor, autor.nacionalidad AS autor_nacionalidad, autor.nacimiento AS autor_nacimiento " +
        "FROM libro " +
        "LEFT JOIN serie ON libro.serieId = serie.id " +
        "INNER JOIN genero ON libro.generoId = genero.id " +
        "INNER JOIN autor ON libro.autorId = autor.id " +
        "WHERE libro.id = ?",
      [req.params.id]
    );
    res.json(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const getBooksSearch = async (req, res) => {
  try {
    const [body] = await pool.query(
      "SELECT libro.id, libro.nombre, libro.imagen, libro.anio, " +
        "autor.nombre AS autor_nombre, genero.nombre AS genero " +
        "FROM libro " +
        "INNER JOIN autor ON libro.autorId = autor.id " +
        "INNER JOIN genero ON libro.generoId = genero.id " +
        "LIMIT 20"
    );
    res.json(body);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const getBook = async (req, res) => {
  try {
    const [body] = await pool.query(
      "SELECT libro.* " + "FROM libro " + "WHERE libro.id = ?",
      [req.params.id]
    );
    res.json(body[0]);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const result = await pool.query(
      "INSERT INTO libro (nombre, anio, imagen, autorId, generoId, serieId) VALUES (?, ?, ?, ?, ?, ?)",
      [
        req.body.nombre,
        req.body.anio,
        req.body.imagen,
        req.body.autorId,
        req.body.generoId,
        req.body.serieId,
      ]
    );
    res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const deleteBook = (req, res) => {
  try {
    const result = pool.query("DELETE FROM libro WHERE id = ?", [
      req.params.id,
    ]);
    if (result.affectedRows <= 0)
      return res.status(404).json({
        message: "This book does not exist",
      });
    res.send(result);
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, anio, imagen, autorId, generoId, serieId } = req.body;

    const [result] = await pool.query(
      "UPDATE libro SET nombre = ?, anio = ?, imagen = ?, autorId = ?, generoId = ?, serieId = ?  WHERE id = ?",
      [nombre, anio, imagen, autorId, generoId, serieId, id]
    );
    res.json("Updated");
    if (result.affectedRows === 0)
      return res.status(404).json({
        message: "Book Not Found",
      });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
    });
  }
};
