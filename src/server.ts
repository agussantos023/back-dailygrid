import app from './app.ts';
import db from './config/database.ts';
import './models/index.ts';

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // await db.sync({ alter: true });
    await db.sync();
    console.log('✅ Database connected & synced');

    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
}

startServer();