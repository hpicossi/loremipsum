const express = require('express');
const session = require('express-session');
const passport = require('passport');
const Library = require('./models/Library');
const Book = require('./models/Book');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Successfully logged in.');
});

app.post('/library', (req, res) => {
  const { name, location, telefono } = req.body;

  Library.create({ name, location, telefono })
    .then((library) => res.json(library))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get('/library/:id', (req, res) => {
  const libraryId = req.params.id;

  Library.findOne({
    where: { id: libraryId },
    include: [{ model: Book }],
  })
    .then((library) => {
      if (library) {
        res.json(library);
      } else {
        res.status(404).json({ error: 'Library not found.' });
      }
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get('/library', (req, res) => {
  Library.findAll({ include: [{ model: Book }] })
    .then((libraries) => res.json(libraries))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.put('/library/:id', (req, res) => {
  const libraryId = req.params.id;
  const { name, location, telefono } = req.body;

  Library.update({ name, location, telefono }, { where: { id: libraryId } })
    .then(() => res.json({ message: 'Library updated successfully.' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete('/library/:id', (req, res) => {
  const libraryId = req.params.id;

  Library.destroy({ where: { id: libraryId } })
    .then(() => res.json({ message: 'Library deleted successfully.' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.post('/book', (req, res) => {
  const { isbn, titulo, autor, year, libraryId } = req.body;

  Book.create({ isbn, titulo, autor, year, libraryId })
    .then((book) => res.json(book))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get('/book/:id', (req, res) => {
  const bookId = req.params.id;

  Book.findByPk(bookId)
    .then((book) => {
      if (book) {
        res.json(book);
      } else {
        res.status(404).json({ error: 'Book not found.' });
      }
    })
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.get('/book', (req, res) => {
  Book.findAll()
    .then((books) => res.json(books))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.put('/book/:id', (req, res) => {
  const bookId = req.params.id;
  const { isbn, titulo, autor, year } = req.body;

  Book.update({ isbn, titulo, autor, year }, { where: { id: bookId } })
    .then(() => res.json({ message: 'Book updated successfully.' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

app.delete('/book/:id', (req, res) => {
  const bookId = req.params.id;

  Book.destroy({ where: { id: bookId } })
    .then(() => res.json({ message: 'Book deleted successfully.' }))
    .catch((err) => res.status(400).json({ error: err.message }));
});

(async () => {
  await User.sync();
  await Library.sync();
  await Book.sync();
  
  User.findOne({ where: { name: 'admin' } }).then((user) => {
    if (!user) {
      bcrypt.hash('admin', 10).then((hashedPassword) => {
        User.create({ name: 'admin', password: hashedPassword });
      });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
