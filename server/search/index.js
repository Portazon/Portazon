const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const queries = require('./queries');

const {
  searchQuery,
  showCategory,
  addDocument,
  createUser,
  searchUser,
  createIndexMapping,
  deleteIndex
} = queries;


// BodyParser
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: false}));


//*************
// GET Routing: Search
//*************

// Search Query && Categories Route
router.get('/user', (req, res) => {
  searchUser(req.query).then((response) => {
    let hits = response.hits.hits;
    console.log(hits);

    res.status(200).send(hits);
  })
});


router.get('/', (req, res) => {
  searchQuery(req.query).then((response) => {
    let hits = response.hits.hits;

    res.status(200).send(hits);
  })
});


// Show Category Specific Products Route
router.get('/category', (req, res) => {
  showCategory(req.query.category).then((response) => {
    let hits = response.hits.hits;

    res.status(200).send(hits);
  })
});

//*************
// GET Routing: Delete Index
//*************

router.get('/delete', (req, res) => {
  deleteIndex('products')
  .then(() => {
    res.status(2004).send('Product index has been deleted');
  })
  .catch((err) => console.error(err));
});


//*************
// POST Routing: User and New Index Creation
//*************

// Create User
router.post('/createuser', (req, res) => {
  createUser(req.body)
  .then(() => {
    res.status(201)
    .send(`${req.body.firstname} ${req.body.firstname} has been added to the User database`);
  })
  .catch((err) => console.error(err));
});


router.post('/createindex', (req, res) => {
  createIndexMapping(req.body)
  .then(() => {
    res.status(201).send(`${req.body} has been created`);
  })
  .catch((err) => console.error(err));
});


module.exports = router;