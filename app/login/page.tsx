"use client";
import { REGEX_PASSWORD } from "@/constants/Regex";
import { useAuth } from "@/contexts/AuthContext";
import { LoginFormValues } from "@/interface/Form";
import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
} from "@mantine/core";
import { isEmail, matches, useForm } from "@mantine/form";
import Link from "next/link";

export default function LoginPage() {
  const { login, isLoading } = useAuth();
  const form = useForm<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      password: matches(REGEX_PASSWORD, "Invalid password"),
    },
  });
  return (
    <Container size={420} my={40}>
      <form onSubmit={form.onSubmit((values) => login(values))}>
        <Title
          ta="center"
          style={{
            fontFamily: "Greycliff CF, var(--mantine-font-family)",
            fontWeight: "900",
          }}
        >
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} href="/register">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            placeholder="example@gmail.com"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            {...form.getInputProps("password")}
          />
          {/* <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group> */}
          <Button fullWidth mt="xl" type="submit" loading={isLoading}>
            Sign in
          </Button>
        </Paper>
      </form>
    </Container>
  );
}
