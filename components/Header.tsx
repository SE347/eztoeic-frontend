"use client";
import classes from "@/styles/Header.module.css";
import { Group, Text, Button, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ThemeModeButton } from "./ThemeModeButton";
import { useAuth } from "@/contexts/AuthContext";
import CustomAvatar from "./CustomAvatar";

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const router = useRouter();

  const links1 = [{ link: "/tests", label: "Test Online" }];
  const links2 = [
    { link: "/courses", label: "Course" },
    { link: "/tests", label: "Test Online" },
    { link: "/flashcards", label: "Flashcards" },
  ];

  let links = isAuthenticated ? links2 : links1;

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
