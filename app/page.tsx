"use client";
import ContinuousBanner from "@/components/ContinuousBanner";
import TestCard from "@/components/TestCard";
import { GET_TEST_URL } from "@/constants/AppConstants";
import { axiosInstance } from "@/services/Axios";
import { Loader, SimpleGrid, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [tests, setTests] = useState<Test[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setIsLoading(true);
    const response = await axiosInstance.get(
      `${GET_TEST_URL}?page=1&search=ets`
    );
    const data: Test[] = response.data.tests;
    setTests(data);
    setIsLoading(false);
  };
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
        {isLoading ? (
          <Loader color="blue" />
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 3 }}>
            {tests.map((test) => (
              <TestCard test={test} key={test.id} />
            ))}
          </SimpleGrid>
        )}
      </div>
    </div>
  );
}
