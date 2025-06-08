const jsonServer = require('json-server');
const router = jsonServer.router('db.json');
const port = process.env.PORT || 8000;

const app = jsonServer.create();
app.use(router);
app.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});