import axios from "axios";

import { listConfig, randomListConfig, readConfig } from "./config.js";

const list = async (keyword) => {
  const res = await axios(listConfig(keyword));
  return res.data;
};

const randomList = async () => {
  const res = await axios(randomListConfig());
  return res.data;
};

const read = async (id) => {
  const res = await axios(readConfig(id));
  return res.data;
};

const CatService = {
  list,
  randomList,
  read,
};

export default CatService;
