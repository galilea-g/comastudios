import jwt from "jsonwebtoken";
import { TOKEN_CACHE } from "../config.js";

/**
 * Creates a JSON Web Token (JWT) with the specified payload data and an expiration time of 1 day.
 *
 * @param {Object} payload - The data to be included in the JWT..
 *
 * @returns {Promise<string>} A Promise that resolves with the JWT string if successful, or rejects with an error.
 */
export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_CACHE, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}