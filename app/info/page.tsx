"use client";
import { REGEX_PASSWORD, REGEX_PHONE } from "@/constants/Regex";
import { RegisterFormValues } from "@/interface/Form";
import { register } from "@/services/AuthService";
import { axiosInstance } from "@/services/Axios";
import {
  Container,
  Title,
  Text,
  Anchor,
  TextInput,
  Paper,
  Button,
  PasswordInput,
  Grid
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, isNotEmpty, isEmail, matches } from "@mantine/form";
import Link from "next/link";
import { useState, useEffect } from "react";
import { IconPencil } from '@tabler/icons-react';
import moment from 'moment';

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

  const [userId, setUserId] = useState(null)

  const [fullnameEditable, setFullnameEditable] = useState(false)
  const [phoneEditable, setPhoneEditable] = useState(false)
  const [birthEditable, setBirthEditable] = useState(false)
  const [emailEditable, setEmailEditable] = useState(false)

  if (typeof window !== 'undefined') {
    const getUserInfo = () => {
      const ds = localStorage.getItem("dataStorage")

      if (ds == null)
        return null

      return JSON.parse(ds)
    }

    useEffect(() => {
      setEmail(getUserInfo()["user"]["email"])
      setPhone(getUserInfo()["user"]["phone"])
      setBirth(new Date(getUserInfo()["user"]["dateOfBirth"]))

      setFullName(getUserInfo()["user"]["name"])

      setUserId(getUserInfo()["user"]["id"])
    }, [])
  }

  const updateUserInfo = () => {
    setIsLoading(true);
    axiosInstance.put("/user/profiles/" + userId, {
      "name": fullname,
      "dob": birth,
      "phone": phone
    }).then((res) => {
      setIsLoading(false);
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
          <Title order={6}>Full Name</Title>
          {fullnameEditable ?
            <TextInput
              placeholder="Your full name"
              value={fullname}
              onChange={(event) => setFullName(event.currentTarget.value)}
            //{...registerForm.getInputProps("fullName")}
            />
            :
            <Grid>
              <Grid.Col span={11}>{fullname}</Grid.Col>
              <Grid.Col span={1}><IconPencil style={{ cursor: "pointer" }} size={15} onClick={() => setFullnameEditable(true)} /></Grid.Col>
            </Grid>}

          <Title order={6}>Phone</Title>
          {phoneEditable ?
            <TextInput
              placeholder="Your phone"
              value={phone}
              onChange={(event) => setPhone(event.currentTarget.value)}
            //{...registerForm.getInputProps("phone")}
            />
            :
            <Grid>
              <Grid.Col span={11}>{phone}</Grid.Col>
              <Grid.Col span={1}><IconPencil style={{ cursor: "pointer" }} size={15} onClick={() => setPhoneEditable(true)} /></Grid.Col>
            </Grid>}

          <Title order={6}>Date of Birth</Title>
          {birthEditable ?
            <DatePickerInput
              placeholder="Pick date"
              value={birth}
            //{...registerForm.getInputProps("dateOfBirth")}
            />
            :
            <Grid>
              <Grid.Col span={11}>{moment(birth).format("MMMM D, YYYY")}</Grid.Col>
              <Grid.Col span={1}><IconPencil style={{ cursor: "pointer" }} size={15} onClick={() => setBirthEditable(true)} /></Grid.Col>
            </Grid>}

          <Title order={6}>Email</Title>
          {emailEditable ?
            <TextInput
              placeholder="example@gmail.com"
              value={email}
              onChange={(event) => setEmail(event.currentTarget.value)}
            //{...registerForm.getInputProps("phone")}
            />
            :
            <Grid>
              <Grid.Col span={11}>{email}</Grid.Col>
              <Grid.Col span={1}><IconPencil style={{ cursor: "pointer" }} size={15} onClick={() => setEmailEditable(true)} /></Grid.Col>
            </Grid>}


          <Button fullWidth mt="xl" type="submit" loading={isLoading} onClick={updateUserInfo}>
            Update your account
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default RegisterPage;
