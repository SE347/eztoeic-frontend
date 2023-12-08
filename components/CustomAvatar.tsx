"use client";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, Menu } from "@mantine/core";
import { redirect  } from "next/navigation";
import { useRouter } from "next/navigation";

const getCharacter = (name: string) => {
  const arr = name.split(" ");
  const lastWord = arr[arr.length - 1];
  return lastWord[0].toLocaleUpperCase();
};

function CustomAvatar({ fullName }: { fullName: string }) {
  const { logout } = useAuth();
  const router = useRouter();
  
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <Avatar color="cyan" radius="xl">
          {getCharacter(fullName)}
        </Avatar>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => router.push("/info")}>Edit Info</Menu.Item>
        <Menu.Item onClick={() => logout()}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export default CustomAvatar;
