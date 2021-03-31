import "./db";

const modules = []

const loadModules = (app) => {
  const promises = modules.map(async module => module.init(app));
  return Promise.all(promises);
};

export default loadModules;