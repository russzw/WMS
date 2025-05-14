"use server";

import { signIn } from "@auth/next";
import { redirect } from "next/navigation";

export const authenticate = async (formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    // Redirect to a secure page after successful login
    redirect("/dashboard");
  } catch (err) {
    console.error("Authentication failed:", err);
    throw new Error("Authentication failed!");
  }
};
