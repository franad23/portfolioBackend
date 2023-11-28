const Perspective = require('perspective-api-client');
const dotenv = require('dotenv');

dotenv.config();

const perspective = new Perspective({apiKey: process.env.API_KEY_PERSPECTIVEGOOGLE });

const apiPerspective = async (text) => {
  try {
    const result = await perspective.analyze(text);
    return result;
  } catch (error) {
    return error
  }
}

module.exports = apiPerspective;