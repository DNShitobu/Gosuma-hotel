const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'gosuma2024!';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';

const authMiddleware = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Admin password required.' });
  }
};

export default authMiddleware;
export { ADMIN_PASSWORD, ADMIN_USERNAME };
