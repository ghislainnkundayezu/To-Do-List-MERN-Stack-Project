import jwt from "jsonwebtoken";
import dotenv  from "dotenv";

dotenv.config();    // configure the dotenv to be able to read environment variables.

// Represents the attributes in the Payload object.
interface Payload {
    userId: string;
}

/**
 * This function accepts a payload containing userInfo and uses cryptographic algorithms to generate a Token.
 * @param payload - It holds the data about a specific user.
 * @returns string - The token generated from the combination of the payload and the secret key to generate a signature.
 */
export const generateToken = (payload: Payload): string => {
    return jwt.sign(payload, process.env.TOKEN_SECRET!, {'expiresIn': '30m'}); // a function which signs the token and returns the token string.
}


/**
 * This functions verifies if the token was signed using the same secret key that the server has.
 * @param token - The token string containing the 
 * @returns Payload | null - return a payload containing user information or an error when none is found. 
 */
export const verifyToken = (token: string): Payload  => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET!) as Payload;  // it recalculates the signature based on the secret key.
        return decoded;
      } catch (error: any) {
        // Handle token verification error
        console.error('Error verifying token:');
        throw new Error(error);
      }
}