"use client";
import Loading from "@/components/Loading";
import QuestionItem from "@/components/QuestionItem";
import { Result } from "@/interface/Result";
import { Test, TestPart } from "@/interface/Test";
import { axiosInstance } from "@/services/Axios";
import { Button, LoadingOverlay, Paper, Tabs, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import classes from "@/styles/Tab.module.css";

function PracticePage() {
  const query = useSearchParams();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [testParts, setTestParts] = useState<TestPart[]>([]);
  const [currentTestPart, setCurrentTestPart] = useState<string | null>(null);
  const [visible, { toggle }] = useDisclosure(false);
  const [answersOfUser, setAnswersOfUser] = useState<{}>({});
  const [timer, setTimer] = useState(0);
  const router = useRouter();
  const fetcher = async (url: string) =>
    axiosInstance.get(url).then((res) => res.data);
  const queryParts = query
    .getAll("part")
    .map((e) => `part=${e}`)
    .join("&");
  const queryId = query.get("id");
  const { data, error, isLoading } = useSWR<Test>(
    `tests/${queryId}/?${queryParts}`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onSuccess: (data) => {
        setCurrentTestPart(data.testParts[0].partNumber);
        setTestParts([...data.testParts]);
      },
    }
  );

  const handleAnswerSelection = (index: string, answer: string) => {
    const updatedAnswers = { ...answersOfUser, [index]: answer };
    setAnswersOfUser(updatedAnswers);
  };

  useEffect(() => {
    mutate(`tests/${queryId}/?${queryParts}`);
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    setTimeoutId(timerId); // Lưu ID của timeout

    return () => {
      // Xóa timeout khi component unmount hoặc khi người dùng hoàn thành bài kiểm tra
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timer]);

  const formatTime = () => {
    const minutes = Math.floor((timer % 3600) / 60).toString();
    const seconds = (timer % 60).toString();
    return `${padStart(minutes, 2, "0")}:${padStart(seconds, 2, "0")}`;
  };
  const padStart = (str: string, len: number, char: string) => {
    while (str.length < len) {
      str = `${char}${str}`;
    }

    return str;
  };
  const submitTest = () => {
    const confirmSubmission = window.confirm(
      "Are you sure you want to submit your answers?"
    );
    if (confirmSubmission) {
      if (timeoutId) {
        clearTimeout(timeoutId); // Xóa timeout khi người dùng hoàn thành bài kiểm tra
      }
      toggle();
      let body = {
        answers: answersOfUser,
        parts: query.getAll("part").map((e) => Number.parseInt(e)),
        time: timer.toString(),
      };
      axiosInstance.post(`tests/${queryId}/finish`, body).then((res) => {
        const result: Result = res.data;
        router.push(`results/${result.id}`);
      });
    } else {
    }
  };
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div style={{ marginLeft: 16, marginRight: 16 }}>
      <div
        style={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text size="xl" fw={700}>
          {data?.test.title}
        </Text>
      </div>
      <div
        style={{
          display: "flex",
        }}
      >
        <div style={{ flex: 4 }}>
          <Paper shadow="xs" radius="md" withBorder p="xl">
            <Tabs
              variant="pills"
              radius="xl"
              value={currentTestPart}
              onChange={setCurrentTestPart}
              classNames={classes}
            >
              <Tabs.List>
                {testParts.map((testPart) => (
                  <Tabs.Tab
                    value={testPart.partNumber}
                    key={testPart.id.toString() + "tab"}
                  >{`Part ${testPart.partNumber}`}</Tabs.Tab>
                ))}
              </Tabs.List>
              {testParts.map((testPart) => (
                <Tabs.Panel
                  value={testPart.partNumber}
                  key={testPart.id.toString() + "part"}
                >
                  {testPart.questions.map((question) => (
                    <QuestionItem
                      handleAnswerSelection={handleAnswerSelection}
                      question={question}
                      key={question.id.toString() + "question"}
                      selectAnswerCount={testPart.selectAnswerCount}
                    />
                  ))}
                </Tabs.Panel>
              ))}
            </Tabs>
          </Paper>
        </div>
        <div style={{ width: "20px" }}></div>
        <div style={{ flex: 1 }}>
          <Paper
            shadow="xs"
            radius="md"
            withBorder
            p="xl"
            style={{ position: "sticky", top: "20px" }}
          >
            <Text size="lg">Thời gian làm bài: </Text>
            <Text size="lg" fw={"bold"}>
              {formatTime()}
            </Text>
            <Button fullWidth onClick={submitTest} loading={visible}>
              Submit
            </Button>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default PracticePage;
