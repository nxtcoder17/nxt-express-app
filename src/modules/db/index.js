import mongoose from "mongoose";
import envConfig from "../../config";
import {getLogger} from "../../commons/logger";

const logger = getLogger("db/index.js");

(async () => {
  try {
    await mongoose.connect(envConfig.DB_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
  } catch (err) {
    logger.error(err);
  }
})();