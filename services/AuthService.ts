import { LOGIN_URL, REGISTER_URL } from "@/constants/AppConstants";
import { LoginFormValues, RegisterFormValues } from "@/interface/Form";
import axios from "axios";
import { showErrorNotification, showSuccessNotification } from "./Notification";
import { axiosInstance } from "./Axios";

class AuthService {
  static login = async (data: LoginFormValues) => {
    try {
      const response = await axiosInstance.post(LOGIN_URL, {
        email: data.email,
        password: data.password,
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorNotification(error.response?.data.message);
      }
      throw error;
    }
  };
  static register = async (data: RegisterFormValues) => {
    try {
      const response = await axiosInstance.put(REGISTER_URL, {
        email: data.email,
        password: data.password,
        name: data.fullName,
        isAdmin: false,
        dateOfBirth: data.dateOfBirth?.toISOString(),
        phone: data.phone,
      });
      showSuccessNotification("You have successfully registered your account");
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorNotification(error.response?.data.message);
      }
      throw error;
    }
  };
}

export default AuthService;
