export interface RegisterFormValues {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  dateOfBirth: Date | null;
}

export interface LoginFormValues {
  email: string;
  password: string;
}
