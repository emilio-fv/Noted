const isProduction = process.env.NODE_ENV === 'production';

export const baseUrl = isProduction ? "TODO: PRODUCTION DOMAIN NAME" : 'http://localhost:8000';

export default baseUrl;