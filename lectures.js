const express = require('express');
const fs = require('fs');
const util = require('util');

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
  console.log(lectures);

  res.render('index', { title, lectures });
}

async function lecture(req, res, next) {
  /* todo útfæra */

}

router.get('/', catchErrors(list));
router.get('/:slug', catchErrors(lecture));

module.exports = router;
