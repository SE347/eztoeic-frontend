"use client";
import ContinuousBanner from "@/components/ContinuousBanner";
import Loading from "@/components/Loading";
import TestCard from "@/components/TestCard";
import { Test, TestInfo } from "@/interface/Test";
import { axiosInstance } from "@/services/Axios";
import { Loader, SimpleGrid } from "@mantine/core";
import axios from "axios";
import useSWR from "swr";

export default function MainPage() {
  const fetcher = async (url: string) =>
    axiosInstance.get("/tests?page=1&search=ets").then((res) => res.data);
  const { data, error, isLoading } = useSWR(
    `https://eztoeic-be.onrender.com/tests?page=1&search=ets`,
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
            <TestCard test={test} key={test.id} />
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
