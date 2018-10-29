import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join(__dirname,'../../client/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html');
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
