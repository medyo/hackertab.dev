export const OAUTH_ERRORS: {
  [key: string]: string
} = {
  access_denied: 'You have denied access to Hackertab, please try again.',
  invalid_grant: 'The authentication code is invalid or expired. Please try again.',
  default: 'An unexpected error occurred during sign in. Please try again.',
}
