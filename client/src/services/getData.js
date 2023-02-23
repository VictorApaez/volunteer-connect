import axios from "axios";

export const fetchData = async () => {
  try {
    const res = await axios.get("");
    return res;
  } catch (err) {
    throw new Error(err);
  }
};
