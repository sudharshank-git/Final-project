import app from "./app.js";
import { initializeCartTable } from "./models/cartModel.js";

const port = Number(process.argv[2]) || Number(process.env.PORT) || 4000;

await initializeCartTable();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
