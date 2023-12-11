"use client";
import ContinuousBanner from "@/components/ContinuousBanner";
import Loading from "@/components/Loading";
import TestCard from "@/components/TestCard";
import { Test, TestInfo } from "@/interface/Test";
import { axiosInstance } from "@/services/Axios";
import { SimpleGrid } from "@mantine/core";
import useSWR from "swr";

export default function MainPage() {
  const fetcher = async (url: string) =>
    axiosInstance.get(url).then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `/tests`,
    fetcher
  );

  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <ContinuousBanner />
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <SimpleGrid cols={{ base: 1, sm: 3 }}>
          {data.tests.map((test: TestInfo) => (
            <TestCard test={test} key={test.id.toString()+"test"} />
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
