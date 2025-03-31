import axiosClient from "@/lib/client";
import { HttpStatusCode, isAxiosError } from "axios";

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

    return { token: response.data, status: HttpStatusCode.Ok };
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("Axios error", error);
      return { token: undefined, status: HttpStatusCode.InternalServerError };
    }

    console.log("Unknown error", error);
    return { token: undefined, status: HttpStatusCode.ImATeapot };
  }
};

type SignInResponse = {
  token: string | undefined;
  status: HttpStatusCode;
};
