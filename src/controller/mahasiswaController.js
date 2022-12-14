const config = require('../config/config');
const mysql = require('mysql');
const pool = mysql.createPool(config);

const view = (req, res) => {
  const id = req.params.id;
  let query = 'SELECT * FROM mahasiswa';

  if (id) {
    query += ` where nim = ${id}`;
  }

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
        res.json({ data: results });
      } else {
        res
          .status(404)
          .json({ status: false, message: 'Data tidak ditemukan' });
      }
    });
    connection.release();
  });
};

const input = (req, res) => {
  const data = {
    nim: req.body.nim,
    nama: req.body.nama,
    alamat: req.body.alamat,
    prodi: req.body.prodi,
  };

  const query = 'INSERT INTO mahasiswa SET ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, data, (error, results) => {
      if (error) throw error;

      if (results.affectedRows > 0) {
        res.json({ message: 'Data telah ditambahkan' });
      } else {
        res
          .status(500)
          .json({ status: false, message: 'Data gagal ditambahkan' });
      }
    });
    connection.release();
  });
};

const update = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Masukkan id yang akan diubah' });
  }

  const data = {
    nama: req.body.nama,
    alamat: req.body.alamat,
  };

  const query = 'UPDATE mahasiswa SET ? where nim = ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, [data, id], (error, results) => {
      if (error) throw error;

      if (results.affectedRows > 0) {
        res.json({ message: 'Data telah diupdate' });
      } else {
        res.status(500).json({ status: false, message: 'Data gagal diupdate' });
      }
    });
    connection.release();
  });
};

const destroy = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ message: 'Masukkan id yang akan dihapus' });
  }

  const query = 'DELETE FROM mahasiswa where nim = ?';

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(query, id, (error, results) => {
      if (error) throw error;

      if (results.affectedRows > 0) {
        res.json({ message: 'Data telah dihapus' });
      } else {
        res.status(500).json({ status: false, message: 'Data gagal dihapus' });
      }
    });
    connection.release();
  });
};

module.exports = {
  view,
  input,
  update,
  destroy,
};
