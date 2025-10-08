const jsonServer = require('json-server');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable
const PORT = 3000;

// Enable CORS for frontend
server.use(cors());

// Use default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

// Parse POST request body
server.use(jsonServer.bodyParser);

// Login endpoint
server.post('/auth/login', (req, res) => {
  const { email, password } = req.body;

  const db = router.db; // Get database instance
  const user = db.get('users').find({ email, password }).value();

  if (user) {
    // Create token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    res.json({
      token,
      user: userWithoutPassword,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Logout endpoint (for consistency, though client-side only in this MVP)
server.post('/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Middleware to verify token for protected routes
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/auth/login') {
    return next();
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

// Use default router
server.use(router);

// Start server
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});