// Dinh dang nhung gi can gui cho Backend
import axios from "axios";
const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};
export default (baseURL) => {
  return axios.create({
    baseURL,
    ...commonConfig,
  });
};
