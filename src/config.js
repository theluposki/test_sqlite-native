const app = {
  PORT: Number(process.env.PORT) || 3376,
  NODE_ENV: process.env.NODE_ENV, // # development | production | testing
  accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || 1, 
  refreshTokenExpiresIn: process.env.REFRESH__TOKEN_EXPIRES_IN || 7
}

const cors = {
  origin: process.env.CLIENT_URL, // "http://localhost:1420",
  methods: ["OPTIONS", "GET", "POST", "PUT","DELETE"],
  credentials: true,
};

const websocket = {
  transports: ["websocket", "WebTransport"],
  cors,
};

export default {
  app,
  cors,
  websocket
}
