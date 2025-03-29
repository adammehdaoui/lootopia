import axiosClient from "@/lib/client";
import { isAxiosError } from "axios";

export const handleSignIn = async (email: string, password: string) => {
  console.log("handleSignIn", email, password);

  try {
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    console.log("response", response);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Error during sign-in:",
        error.code,
        error.message,
        error.name
      );
      throw new Error(error.response?.data.message || "Sign-in failed");
    }

    throw error;
  }
};
