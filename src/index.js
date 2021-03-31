import { StatusCodes } from 'http-status-codes';
import { finishApp, getAnApp } from '#app';
import { getLogger } from '#commons/logger';
import loadModules from './modules';
import envConfig from "./config";

const logger = getLogger("src/index.js");

const app = getAnApp();

app.get('/healthy', (req, res) => {
  res.send(StatusCodes.OK);
});

(async () => {
  await loadModules(app);
  finishApp(app);
})();

(async () => {
  try {
    app.listen(Number(envConfig.PORT));
    logger.info(`API Server started @ ${envConfig.PORT}`);
  } catch (err) {
    logger.error(err);
  }
})();
