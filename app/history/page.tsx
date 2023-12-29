"use client";
import Loading from "@/components/Loading";
import TableHistoryTestResult from "@/components/TableHistoryTestResult";
import { useAuth } from "@/contexts/AuthContext";
import { HistoricalTestResultData } from "@/interface/History";
import { axiosInstance } from "@/services/Axios";
import { Avatar, Text } from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

export default function HistoryPage() {
  const { user } = useAuth();
  const [historicalTestResults, setHistoricalTestResults] = useState<
    HistoricalTestResultData[]
  >([]);
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR<HistoricalTestResultData[]>(
    `tests/results`,
    fetcher,
    {
      onSuccess: (data) => {
        setHistoricalTestResults(data);
      },
    }
  );
  const getCharacter = (name: string) => {
    const arr = name.split(" ");
    const lastWord = arr[arr.length - 1];
    return lastWord[0].toLocaleUpperCase();
  };
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "14vw",
        paddingRight: "14vw",
      }}
    >
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          marginBottom: 20,
        }}
      >
        <Avatar color="cyan" radius="xl" size={100}>
          {getCharacter(user!.name)}
        </Avatar>
        <Text fw={"bold"} style={{ fontSize: 24, marginTop: 10 }}>
          {user!.name}
        </Text>
      </div>
      {historicalTestResults.map((e) => (
        <div>
          <Text fw={"bold"} style={{ fontSize: 18, marginTop: 20 }}>
            {e.title}
          </Text>
          <TableHistoryTestResult historicalTestResults={e.values} />
        </div>
      ))}
    </div>
  );
}
