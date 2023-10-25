import { GET_TEST_URL } from "@/constants/AppConstants";
import { axiosInstance } from "./Axios";

export async function getTest() {
  try {
    const response = await axiosInstance.get(
      `${GET_TEST_URL}?page=1&search=ets`
    );
    const tests: Test[] = response.data;
    return tests;
  } catch (e) {
    console.log(e);
  }
}
