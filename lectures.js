const express = require('express');
const fs = require('fs');
const util = require('util');
const hjalp = require('./hjalp')

const readFile = util.promisify(fs.readFile);

const router = express.Router();

async function lesaskra() {
  const texti = await readFile('./lectures.json');

  const json = JSON.parse(texti);

  return json;
}

function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

async function list(req, res) {
  /* todo útfæra */
  //lesa fyrirlestrana inn og birta
  const title = 'Fyrirlestrar';
  const data = await lesaskra();
  const { lectures } = data;

  res.render('index', { title, lectures });
}


async function lecture(req, res, next) {
  /* todo útfæra */
  const data = await lesaskra();
  const { lectures } = data;
  const { slug } = req.params;
  const foundData = data.lectures.find(a => a.slug === slug);

  if(!foundData) {
    return next();
  }

  const { title } = foundData;
  const { category } = foundData;
  const html = hjalp.createContent(foundData.content);

  res.render('lectures', { html, title, category, data, lectures : foundData});
}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
