"use client";
import Loading from "@/components/Loading";
import { Result } from "@/interface/Result";
import { axiosInstance } from "@/services/Axios";
import {
  IconCircleCheckFilled,
  IconCircleMinus,
  IconCircleXFilled,
} from "@tabler/icons-react";
import { Box, Card, Flex, Paper, SimpleGrid, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import useSWR from "swr";
import ResultItem from "@/components/ResultItem";

const fetcher = async (url: string) => {
  let res = await axiosInstance.get(url);
  return res.data;
};

function ResultPage() {
  const params = useParams();
  const [result, setResult] = useState<Result>();

  const { data, error, isLoading } = useSWR<Result>(
    `tests/${params["slug"][0]}/results/${params["slug"][2]}`,
    fetcher,
    {
      onSuccess: (data) => {
        setResult(data);
        console.log(data);
      },
    }
  );

  const formatTime = (timer: number) => {
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

  const questionsCount =
    result?.correctCount! + result?.undoneCount! + result?.wrongCount!;
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div style={{ marginLeft: 16, marginRight: 16 }}>
      <Flex align={"center"} justify={"start"}>
        <Text size="xl" fw="bold">
          Practice results: {result?.testTitle}
        </Text>
        <Box style={{ width: 12 }} />
        {result?.resultDetails.map((e) => (
          <Box
            key={e.partNumber.toString() + "part"}
            style={{
              borderRadius: 15,
              paddingLeft: 8,
              paddingRight: 8,
              marginRight: 8,
            }}
            bg={"#ffad3b"}
          >
            <Text style={{ color: "#ffffff" }}>Part {e.partNumber}</Text>
          </Box>
        ))}
      </Flex>
      <Box style={{ height: 20 }} />
      <Flex
        direction={{ base: "column", sm: "row" }}
        gap={{ base: "sm", sm: "lg" }}
        justify={{ sm: "center" }}
      >
        <Paper
          withBorder
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: "column",
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Flex align={"center"} direction={"row"} gap={"sm"}>
            <Text>Test results</Text>
            <Text fw={600}>
              {result?.correctCount}/{questionsCount}
            </Text>
          </Flex>
          <Flex align={"center"} direction={"row"} gap={"sm"}>
            <Text>Accuracy</Text>
            <Text fw={600}>
              {(result?.correctCount! / questionsCount).toFixed(2)}%
            </Text>
          </Flex>
          <Flex align={"center"} direction={"row"} gap={"sm"}>
            <Text>Time to do test</Text>
            <Text fw={600}>{formatTime(Number.parseInt(result?.time!))}</Text>
          </Flex>
        </Paper>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{ width: "20%" }}
        >
          <Flex align={"center"} direction={"column"} gap={"sm"}>
            <IconCircleCheckFilled style={{ color: "#3cb46e" }} />
            <Text style={{ color: "#3cb46e" }} fw={"bold"}>
              Correct
            </Text>
            <Text fw={"bold"}>{result?.correctCount}</Text>
            <Text>Questions</Text>
          </Flex>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{ width: "20%" }}
        >
          <Flex align={"center"} direction={"column"} gap={"sm"}>
            <IconCircleMinus style={{ color: "#e43a45" }} />
            <Text style={{ color: "#e43a45" }} fw={"bold"}>
              Incorrect
            </Text>
            <Text fw={"bold"}>{result?.wrongCount}</Text>
            <Text>Questions</Text>
          </Flex>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{ width: "20%" }}
        >
          <Flex align={"center"} direction={"column"} gap={"sm"}>
            <IconCircleXFilled style={{ color: "#71869d" }} />
            <Text style={{ color: "#71869d" }} fw={"bold"}>
              Skip
            </Text>
            <Text fw={"bold"}>{result?.undoneCount}</Text>
            <Text>Questions</Text>
          </Flex>
        </Card>
      </Flex>
      <Text size="xl" fw="bold">
        Answers:
      </Text>
      {result?.resultDetails.map((e) => (
        <div
          style={{ marginBottom: 15, marginTop: 15 }}
          key={"result1" + e.partNumber}
        >
          <Text fw={700} style={{ marginBottom: 10 }}>
            Part {e.partNumber}
          </Text>
          <SimpleGrid cols={2}>
            {e.questions.map((e1) => (
              <ResultItem
                resultDetail={e1}
                key={"result1" + e1.resultDetailId}
              />
            ))}
          </SimpleGrid>
        </div>
      ))}
    </div>
  );
}

export default ResultPage;
