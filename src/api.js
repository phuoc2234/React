const API_URL = (process.env.REACT_APP_API_URL || "http://localhost:2300").replace(/\/$/, "");

export const apiUrl = (path) => `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
