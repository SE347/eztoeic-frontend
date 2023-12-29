"use client";
import Loading from "@/components/Loading";
import { Test, TestPart } from "@/interface/Test";
import { axiosInstance } from "@/services/Axios";
import { Paper, Tabs, Text } from "@mantine/core";
import { useSearchParams, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import classes from"@/styles/Tab.module.css";
import SolutionItem2 from "@/components/SolutionItem2";

function SolutionPage() {
  const query = useSearchParams();
  const params = useParams();
  const [testParts, setTestParts] = useState<TestPart[]>([]);
  const [currentTestPart, setCurrentTestPart] = useState<string | null>(null);
  const fetcher = async (url: string) =>
    axiosInstance.get(url).then((res) => res.data);
  const queryParts = query
    .getAll("part")
    .map((e) => `part=${e}`)
    .join("&");
  const id = params.id;
  const { data, error, isLoading } = useSWR<Test>(
    `tests/${id}/?${queryParts}`,
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
                    <SolutionItem2
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
    
      </div>
    </div>
  );
}

export default SolutionPage;
