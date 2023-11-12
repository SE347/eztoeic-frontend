"use client";
import { REGEX_PASSWORD, REGEX_PHONE } from "@/constants/Regex";
import { RegisterFormValues } from "@/interface/Form";
import { register } from "@/services/AuthService";

import {
  Container,
  Title,
  Text,
  Anchor,
  TextInput,
  Paper,
  Button,
  PasswordInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, isNotEmpty, isEmail, matches } from "@mantine/form";
import Link from "next/link";
import { useState } from "react";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const registerForm = useForm<RegisterFormValues>({
    initialValues: {
      email: "",
      password: "",
      phone: "",
      dateOfBirth: null,
      fullName: "",
    },

    validate: {
      fullName: isNotEmpty("Enter your full name"),
      email: isEmail("Invalid email"),
      phone: matches(REGEX_PHONE, "Invalid phone number"),
      password: matches(REGEX_PASSWORD, "Invalid password"),
      dateOfBirth: (value) =>
        value != null ? null : "Enter your date of birth",
      // phone: (value) =>
      //   /^(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(value)
      //     ? null
      //     : "Invalid phone number",
      // password: (value) =>
      //   /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[$&+,:;=?@#|'<>.^*()%!-]).+$/.test(
      //     value
      //   )
      //     ? null
      //     : "Invalid password",
    },
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      await register(values);
      setIsLoading(false);
      registerForm.reset();
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <Container size={420} my={40}>
      <form onSubmit={registerForm.onSubmit(handleSubmit)}>
        <Title
          ta="center"
          style={{
            fontFamily: "Greycliff CF, var(--mantine-font-family)",
            fontWeight: "900",
          }}
        >
          Create account
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do you already have an account?{" "}
          <Anchor size="sm" component={Link} href="/login">
            Sign in
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Full Name"
            placeholder="Your full name"
            {...registerForm.getInputProps("fullName")}
          />
          <TextInput
            label="Phone"
            placeholder="Your phone"
            {...registerForm.getInputProps("phone")}
          />
          <DatePickerInput
            label="Date Of Birth"
            placeholder="Pick date"
            {...registerForm.getInputProps("dateOfBirth")}
          />
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            {...registerForm.getInputProps("email")}
          />
          {/* <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        /> */}
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...registerForm.getInputProps("password")}
          />
          {/* <PasswordStrength form={registerForm} /> */}
          {/* <PasswordInput
          label="Confirm password"
          placeholder="Confirm your password"
          required
          mt="md"
        /> */}
          {/* <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group> */}
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Sign up
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default RegisterPage;
