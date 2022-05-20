const express = require('express');
const router = express.Router();

const Record = require('../models/Record');

router.get('/', async (req, res) => {
  try {
    res.json(await Record.find());
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  const record = new Record(req.body);
  await record.save();
  res.json(record);
});

router.get('/:id', async (req, res) => {
  try {
    res.json(await Record.findById(req.params.id));
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    await Record.findByIdAndUpdate(req.params.id, req.body);
    res.json({ post: {...req.body, _id:req.params.id,} });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Record.findByIdAndRemove(req.params.id);
    res.json({ state: 'deleted' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
