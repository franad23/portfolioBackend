const Perspective = require('perspective-api-client');
const dotenv = require('dotenv');

dotenv.config();

const perspective = new Perspective({apiKey: process.env.API_KEY_PERSPECTIVEGOOGLE });

const apiPerspective = async (text) => {
  const result = await perspective.analyze(text);
  return JSON.stringify(result, null, 2)
}

module.exports = apiPerspective;