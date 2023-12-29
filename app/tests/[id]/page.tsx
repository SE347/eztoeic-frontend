"use client";
import Loading from "@/components/Loading";
import classes from "@/styles/Tab.module.css";
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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { TestInfo } from "@/interface/Test";
import PartSolutionItem from "@/components/PartSolutionItem";
import { axiosInstance } from "@/services/Axios";
import { partInfo } from "@/constants/AppConstants";
export interface PartInfo {
  name: string;
  value: string;
  questionCount: number;
}

export default function TestInfoPage() {
  const params = useParams();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [value, setValue] = useState<string[]>([]);
  const fetcher = async (url: string) =>
    axiosInstance.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR<TestInfo>(
    `/tests/${params.id}/info`,
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
  const handlePractice = () => {
    if (isAuthenticated) {
      const temp = value.map((e) => `part=${e}`);
      const query = temp.join("&");
      router.push(`/tests/${params.id}/practice?id=${params.id}&${query}`);
    } else {
      open();
    }
  };
  const handleFullTest = () => {
    if (isAuthenticated) {
      const temp = ["1", "2", "3", "4", "5", "6", "7"].map((e) => `part=${e}`);
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
        classNames={classes}
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
              <Button
                onClick={value.length > 0 ? handlePractice : handleFullTest}
              >
                Practice
              </Button>
            </Tabs.Panel>
            <Tabs.Panel value="full">
              <Button style={{ marginTop: 20 }} onClick={handleFullTest}>
                Start
              </Button>
            </Tabs.Panel>
          </Tabs>
        </Tabs.Panel>
        <Tabs.Panel value="answer">
          <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
            <PartSolutionItem partInfo={null} testId={params.id as string} />
            <div style={{ height: 20 }} />
            <Text>Parts:</Text>
            {partInfo.map((e2) => (
              <PartSolutionItem
                partInfo={e2}
                testId={params.id as string}
                key={"solution" + e2.name}
              />
            ))}
          </div>
        </Tabs.Panel>
      </Tabs>
    </Paper>
  );
}
