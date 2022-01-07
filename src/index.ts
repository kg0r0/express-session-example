import express from 'express';
import session from 'express-session';
const app: express.Express = express();
const PORT = 3000;

declare module 'express-session' {
  export interface Session {
    count: number
  }
}

app.use(session({
  name: 'TEST',
  secret: 'TEST_SECRET',
  cookie: {},
  // express-session deprecated undefined resave option; provide resave option
  resave: false,
  // express-session deprecated undefined saveUninitialized option; provide saveUninitialized option
  saveUninitialized: true
}))
app.get('/', (req: express.Request, res: express.Response) => {
  if (req.session.count) {
    req.session.count++;
    res.end(`count: ${req.session.count}`);
  } else {
    req.session.count = 1;
    res.end('welcome to the session demo!')
  }
})

app.listen(PORT, () => {
  console.log(`listen port: ${PORT}`);
});