import axios from "axios";

const paymongo = axios.create({
  baseURL: "https://api.paymongo.com/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization:
      "Basic " +
      Buffer.from(process.env.PAYMONGO_SECRET_KEY + ":").toString("base64"),
  },
});

export default paymongo;