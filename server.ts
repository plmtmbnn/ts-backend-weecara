import app from './app';
const PORT = process.env.BE_PORT;

app.listen(PORT, () => {
  console.log('=======================================================');
  console.log(`== Express typescript server listening on port: ${PORT} ==`);
  console.log('=======================================================');
});
