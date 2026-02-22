import { createTuyau } from "@tuyau/client";
import { api } from "@petly/api/.adonisjs/api";

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3333";

export const tuyau = createTuyau({
  api,
  baseUrl: API_URL,
});
