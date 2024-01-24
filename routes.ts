/**
 * An arra yof routes taht are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ['/', '/auth/new-verification'];

/**
 * An arra yof routes taht are use for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/error',
    '/auth/reset',
];

/**
 * The prefix for API authentication routes
 * Routes taht start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = '/api/auth';

/**
 * The default redirect path after logged in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/settings';
