const router = require('express').Router();
const { mhs } = require('../controller');

router.get('/mahasiswa/:id?', mhs.view);
router.post('/mahasiswa', mhs.input);
router.put('/mahasiswa/:id?', mhs.update);
router.delete('/mahasiswa/:id?', mhs.destroy);

module.exports = router;
