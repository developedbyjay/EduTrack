import app from './app.js'

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Database is connected and App is running on Port ${port}`);
});
