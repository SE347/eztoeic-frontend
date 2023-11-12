"use client";
import Loading from "@/components/Loading";
import {
  Paper,
  Text,
  Tabs,
  Checkbox,
  Button,
  Modal,
  Container,
  Flex,
  UnstyledButton,
} from "@mantine/core";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Test, TestInfo } from "@/interface/Test";
interface PartInfo {
  name: string;
  value: string;
  questionCount: number;
}
const partInfo: PartInfo[] = [
  {
    name: "Part 1",
    value: "1",
    questionCount: 6,
  },
  {
    name: "Part 2",
    value: "2",
    questionCount: 25,
  },
  {
    name: "Part 3",
    value: "3",
    questionCount: 39,
  },
  {
    name: "Part 4",
    value: "4",
    questionCount: 30,
  },
  {
    name: "Part 5",
    value: "5",
    questionCount: 30,
  },
  {
    name: "Part 6",
    value: "6",
    questionCount: 16,
  },
  {
    name: "Part 7",
    value: "7",
    questionCount: 54,
  },
];

export default function TestInfoPage() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState<string[]>([]);
  const fetcher = async (url: string) => axios.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<TestInfo>(
    `https://eztoeic-be.onrender.com/tests/${params.id}/info`,
    fetcher
  );
  const [opened, { open, close }] = useDisclosure(false);
  const itemCheckBox = partInfo.map((e) => (
    <Checkbox
      value={e.value}
      key={e.value}
      label={`${e.name} (${e.questionCount} questions)`}
      style={{ marginBottom: 10 }}
    />
  ));
  // console.log(query.getAll("part"));
  const handlePractice = () => {
    if (isAuthenticated) {
      const temp = value.map((e) => `part=${e}`);
      const query = temp.join("&");
      router.push(`/tests/${params.id}/practice?id=${params.id}&${query}`);
    } else {
      open();
    }
  };
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <Paper
      shadow="xs"
      radius="md"
      withBorder
      p="xl"
      style={{ marginLeft: 15, marginRight: 15 }}
    >
      <Modal opened={opened} onClose={close} title="Authentication">
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="column"
          wrap="nowrap"
        >
          <Container
            bg="var(--mantine-color-blue-light)"
            style={{ borderRadius: 10 }}
          >
            <Text>
              Please log in or register for a free account to start the test and
              receive detailed analysis of your results.
            </Text>
          </Container>
          <Button fullWidth onClick={() => router.push("/login")}>
            Sign in
          </Button>
          <UnstyledButton
            component={Link}
            href="/register"
            style={{ alignSelf: "flex-start" }}
          >
            Not a member yet? Register now!
          </UnstyledButton>
        </Flex>
      </Modal>
      <Text fw={700} style={{ fontSize: 30 }}>
        {data?.title}
      </Text>
      <Tabs
        defaultValue="info"
        variant="pills"
        radius="xl"
        style={{ marginTop: 20 }}
      >
        <Tabs.List style={{ marginBottom: 20 }}>
          <Tabs.Tab value="info"> Test Information</Tabs.Tab>
          <Tabs.Tab value="answer">Answer</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="info">
          <Text size="md" fw={600}>
            Test set: {data?.setTitle}
          </Text>
          <Text size="md">
            🕒 {data?.time} minutes | {data?.sectionCount} part |{" "}
            {data?.questionCount} questions
          </Text>
          <Tabs defaultValue="practice" style={{ marginTop: 10 }}>
            <Tabs.List>
              <Tabs.Tab value="practice"> Practice</Tabs.Tab>
              <Tabs.Tab value="full">Full Test</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="practice">
              <Checkbox.Group
                value={value}
                onChange={setValue}
                label="Select the test you want to take"
                style={{ marginTop: 20, marginBottom: 20 }}
              >
                {itemCheckBox}
              </Checkbox.Group>
              <Button onClick={handlePractice}>Practice</Button>
            </Tabs.Panel>
            <Tabs.Panel value="full">
              <Button onClick={() => console.log(value)}>Start</Button>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
        <Tabs.Panel value="answer">answer</Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
