import { axiosInstance } from "@/services/Axios";
import React, { useState } from "react";
import useSWR from "swr";
import Loading from "./Loading";
import { Text } from "@mantine/core";
import { SolutionDetail } from "@/interface/Solution";

function SolutionItem({
  partId,
  testId,
}: {
  partId: string | null;
  testId: string;
}) {
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const [solution, setSolution] = useState<SolutionDetail[]>();
  const { data, error, isLoading } = useSWR(
    partId !== null
      ? `tests/${testId}/${partId}/solutions`
      : `tests/${testId}/solutions`,
    fetcher,
    {
      onSuccess: (data) => {
        setSolution(data);
      },
    }
  );
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div>
      {solution?.map((e) => (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <Text>Question {e.index}: </Text>
          <Text style={{ marginLeft: 4 }}>{e.answer}</Text>
        </div>
      ))}
    </div>
  );
}

export default SolutionItem;
