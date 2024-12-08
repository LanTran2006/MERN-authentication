import { toast } from "react-toastify";
import axiosInstance from "./instance";
interface detail_types {
  name: string;
  email: string;
  pass: string;
}
export function isValidEmail(email: string) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

