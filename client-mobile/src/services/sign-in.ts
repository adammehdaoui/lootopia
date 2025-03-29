import axiosClient from "@/lib/client";

export const signIn = async (email: string, password: string) => {
  const response = await axiosClient.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};
