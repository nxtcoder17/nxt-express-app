import { StatusCodes } from 'http-status-codes';
import { finishApp, getAnApp } from '#app';
import { getLogger } from '#commons/logger';
import loadModules from './modules';

const logger = getLogger(__dirname);

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
    await app.listen(Number(process.env.PORT));
    logger.info(`API Server started @ ${process.env.PORT}`);
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
})();
