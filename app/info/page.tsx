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
import { useState, useEffect } from "react";

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

  const [fullname, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [birth, setBirth] = useState(new Date(0))

  if (typeof window !== 'undefined') {
    const getUserInfo = () => {
      const ds = localStorage.getItem("dataStorage")

      if (ds == null)
        return null

      return JSON.parse(ds)
    }

    useEffect(() => {
      console.log("use effect")

      setEmail(getUserInfo()["user"]["name"])
      setPhone(getUserInfo()["user"]["phone"])
      setBirth(new Date(getUserInfo()["user"]["dateOfBirth"]))

      setFullName(getUserInfo()["user"]["email"])
    })
  }

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
          Edit your account
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Full Name"
            placeholder="Your full name"
            value={fullname}
            onChange={(event) => setFullName(event.currentTarget.value)}
            //{...registerForm.getInputProps("fullName")}
          />
          <TextInput
            label="Phone"
            placeholder="Your phone"
            value={phone}
            onChange={(event) => setPhone(event.currentTarget.value)}
            //{...registerForm.getInputProps("phone")}
          />
          <DatePickerInput
            label="Date Of Birth"
            placeholder="Pick date"
            value={birth}
            //{...registerForm.getInputProps("dateOfBirth")}
          />
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            //{...registerForm.getInputProps("email")}
          />
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Update your account
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default RegisterPage;
