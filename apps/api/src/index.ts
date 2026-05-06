import 'dotenv/config';
import app from './app';

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`[YouweTech API] Server running on port ${PORT}`);
});
