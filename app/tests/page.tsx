"use client";
import Loading from "@/components/Loading";
import TestCard from "@/components/TestCard";
import { TestInfo } from "@/interface/Test";
import { axiosInstance } from "@/services/Axios";
import {
  Button,
  Pagination,
  SimpleGrid,
  TextInput,
  Image,
} from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

export default function TestsPage() {
  const [tests, setTests] = useState<TestInfo[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const [activePage, setPage] = useState(1);
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR(
    `/tests?page=${activePage}&search=${searchText}`,
    fetcher,
    {
      onSuccess: (data) => {
        setTests(data.tests);
        setPageCount(data.pageCount);
      },
    }
  );
  if (error) return <div>{error.message}</div>;
  if (isLoading) return <Loading />;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingLeft: "15vw",
        paddingRight: "15vw",
      }}
    >
      <Image src={"/banner.jpg"} style={{ marginTop: 20, marginBottom: 10 }} />
      <TextInput
        placeholder="Enter search tests..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.currentTarget.value)}
      />
      <Button
        style={{ width: 100, marginTop: 15, marginBottom: 15 }}
        onClick={() => {
          setPage(1);
          setSearchText(searchTerm);
        }}
      >
        Search
      </Button>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {tests.map((test: TestInfo) => (
          <TestCard test={test} key={test.id.toString() + "test"} />
        ))}
      </SimpleGrid>
      <div style={{ alignSelf: "flex-start", marginTop: 20 }}>
        <Pagination
          value={activePage}
          onChange={setPage}
          total={pageCount ?? 1}
        />
      </div>
    </div>
  );
}
