/**
 * Middleware function to validate request body against a given schema using Yup
 * 
 * @param {Object} schema The Yup schema object used for validation
 * @returns {Function} A middleware function to be used in route handlers
 */
export const validateSchema = (schema) => (req, res, next) => {
    try {
        // Parse the request body using the provided schema
        schema.parse(req.body);
        next();
    } catch (error) {
        // Send a 400 Bad Request response with validation error messages if parsing fails
        return res
        .status(400)
        .json( error.errors.map((error) => error.message));
    }
};