const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const MIN_LENGTH = 6;

export const required = (value: any) => value ? undefined : 'Required';

export const invalidEmail = (value: string) =>
  value && !EMAIL_REGEX.test(value) ?
    'Invalid email address' : undefined;

export const maxLength = (max: number) => (value: string) =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
export const maxLength15 = maxLength(15);

export const minLength = (min: number) => (value: string) =>
  value && value.length < min ? `Must be at least ${min} characters or more` : undefined;

export const minLength6 = minLength(6);

export const matchPassword = (password: string, confirmPassword: string) =>
  password && confirmPassword && password !== confirmPassword ? 'Password and confirm password does not match' : undefined;