import type { CookieOptions } from "express";
import { config } from "dotenv";
config();
const isProduction = process.env.NODE_ENV === 'production';

export const COOKIE_MAX_AGE = 24 * 60 * 60 * 1000;
export const settingsCookies: CookieOptions = {
  httpOnly: true,
  maxAge: COOKIE_MAX_AGE,
sameSite: isProduction ? "strict" : "lax",
  secure: isProduction,
};