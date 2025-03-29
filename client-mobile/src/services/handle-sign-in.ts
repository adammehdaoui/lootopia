import axiosClient from "@/lib/client";
import { isAxiosError } from "axios";

export const handleSignIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  console.log("handleSignIn", email, password);

  try {
    const response = await axiosClient.post("/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error", error);
      throw new Error(error.message);
    }

    console.error("Unknown error", error);
    throw error;
  }
};

type SignInResponse = {
  token: string;
};
