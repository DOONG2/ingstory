import axios from "axios";

axios.defaults.withCredentials = true;

export const client = axios.create({
  baseURL:
    "https://23qle2bzdnqgtwdegesxodas6e0qzlzr.lambda-url.ap-northeast-2.on.aws",
  withCredentials: true,
  headers: {
    Authorization: "nospoonhere",
  },
});
