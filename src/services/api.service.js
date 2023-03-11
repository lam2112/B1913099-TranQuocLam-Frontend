// Định dạng khung dữ liệu gửi cho backend
import axios from "axios";
const commonConfig = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// send link + header
export default (baseURL) => {
  return axios.create({
    baseURL,
    ...commonConfig,
  });
};
