"use client";
import { REGEX_PASSWORD, REGEX_PHONE } from "@/constants/Regex";
import { DataStorage, useAuth } from "@/contexts/AuthContext";
import { RegisterFormValues } from "@/interface/Form";
import { axiosInstance } from "@/services/Axios";
import { Container, Title, TextInput, Paper, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, isNotEmpty, isEmail, matches } from "@mantine/form";
import { useState, useEffect } from "react";

function RegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useAuth();
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
    },
  });

  const handleSubmit = async (values: RegisterFormValues) => {
    try {
      setIsLoading(true);
      await axiosInstance.put(`user/profiles/{user-id}`);
      setIsLoading(false);
      registerForm.reset();
    } catch (e) {
      setIsLoading(false);
    }
  };

  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [birth, setBirth] = useState(new Date(0));

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUserInfo = () => {
      const ds = localStorage.getItem("dataStorage");

      if (ds == null) return null;

      return JSON.parse(ds);
    };
    setEmail(getUserInfo()["user"]["email"]);
    setPhone(getUserInfo()["user"]["phone"]);
    setBirth(new Date(getUserInfo()["user"]["dateOfBirth"]));
    setFullName(getUserInfo()["user"]["name"]);
    setUserId(getUserInfo()["user"]["id"]);
  }, []);

  const updateUserInfo = async () => {
    setIsLoading(true);
    axiosInstance
      .put("user/" + userId, {
        name: fullname,
        dob: birth,
        phone: phone,
      })
      .then((res) => {
        const dataStorage = localStorage.getItem("dataStorage");
        if (dataStorage !== null) {
          const data: DataStorage = JSON.parse(dataStorage);
          let newUser = {
            ...data.user,
            name: fullname,
            dob: birth,
            phone: phone,
          };
          data.user = newUser;
          let newData = data;
          localStorage.setItem("dataStorage", JSON.stringify(newData));
          setUser(newUser);
        }
        setIsLoading(false);
      });
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
            disabled
            label="Email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
            //{...registerForm.getInputProps("email")}
          />
          <Button
            fullWidth
            mt="xl"
            type="submit"
            loading={isLoading}
            onClick={updateUserInfo}
          >
            Update your account
          </Button>
        </Paper>
      </form>
    </Container>
  );
}

export default RegisterPage;
