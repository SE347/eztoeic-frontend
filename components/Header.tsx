"use client";
import classes from "@/styles/Header.module.css";
import { Group, Text, Button, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeModeButton } from "./ThemeModeButton";
import { useAuth } from "@/contexts/AuthContext";
import CustomAvatar from "./CustomAvatar";
const links = [
  { link: "/about", label: "Course" },
  { link: "/pricing", label: "Test Online" },
  { link: "/learn", label: "Flashcards" },
];

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const items = links.map((link) => (
    <Link key={link.label} href={link.link} className={classes.link}>
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <div className={classes.inner}>
        <Group>
          <UnstyledButton onClick={() => router.push("/")}>
            <Text fw={700} size="lg">
              {" "}
              EZTOEIC
            </Text>
          </UnstyledButton>
        </Group>

        <Group>
          <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
            {items}
          </Group>
          <ThemeModeButton />
          {!isAuthenticated ? (
            <Group>
              <Button variant="default" onClick={() => router.push("/login")}>
                Sign in
              </Button>
              <Button onClick={() => router.push("/register")}>Sign up</Button>
            </Group>
          ) : (
            <CustomAvatar fullName={user!.name} />
          )}
        </Group>
      </div>
    </header>
  );
}
