import axios from 'axios';
export const Instance = axios.create({
  baseURL: 'https://diagnostics-mono-backend-wdjc5wyhsa-nw.a.run.app',
});
