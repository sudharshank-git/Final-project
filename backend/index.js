import app from "./app.js";
import { initializeCartTable } from "./models/cartModel.js";
import { initializeDashboardTable } from "./models/productModel.js";

const port = Number(process.argv[2]) || Number(process.env.PORT) || 4000;

await initializeCartTable();
await initializeDashboardTable();

app.listen(port, () => {
  // Server startup is intentionally quiet to avoid noisy console output.
});
