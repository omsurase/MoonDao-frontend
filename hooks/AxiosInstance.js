import axios from "axios";
import { JS_SERVER_URL } from "@/constants/backend.constants";

const AxiosJsInstance = axios.create({
  baseURL: JS_SERVER_URL,
});

export default AxiosJsInstance;