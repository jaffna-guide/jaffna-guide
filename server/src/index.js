import express from 'express';


const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
<<<<<<< HEAD
  res.send({ "hay uki" });
=======
  res.send({ Name: 'SIANSS' });
>>>>>>> d9fa328120a121a296243c597b75bd0fff4fb94e
});

app.listen(PORT, err => {
  if (err) {
    console.log('Err: ', err);
    return 1;
  }

  console.log(
    '===> jaffna.guide <===',
    `| NODE_ENV: ${process.env.NODE_ENV || 'development'}`,
    `| Listening on http://0.0.0.0:${PORT}.`,
  );
});
