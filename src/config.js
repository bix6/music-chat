export default {
  API_ENDPOINT:
    process.env.REACT_APP_API_ENDPOINT || "http://localhost:8000/api",
  API_ENDPOINT_FOR_SOCKET:
    process.env.REACT_APP_API_ENDPOINT_FOR_SOCKET || "http://localhost:8000/",
  API_KEY: process.env.REACT_APP_API_KEY,
  YOUTUBE_API_KEY: process.env.REACT_APP_YOUTUBE_API_KEY,
};
