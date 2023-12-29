"use client";
import LessonItem from "@/components/LessonItem";
import Loading from "@/components/Loading";
import { Lesson } from "@/interface/Course";
import { axiosInstance } from "@/services/Axios";
import { Pagination, SimpleGrid, Image, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function LessonsPage() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const params = useParams();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const [activePage, setPage] = useState(1);
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR(`playlists/${params.id}`, fetcher, {
    onSuccess: (data) => {
      setLessons(data.lessons);
      setPageCount(data.pageCount);
    },
  });
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
      <Image
        src={"/banner.jpg"}
        style={{ marginTop: 20, marginBottom: 10 }}
        alt="image"
      />
      <Text style={{ fontSize: 28 }} fw={700}>
        Online course
      </Text>
      <Text style={{ marginBottom: 20 }}>
        Eztoeic high-quality online English courses are designed according to
        the CEFR standard English program of Cambridge and Oxford universities
        with a rich and diverse system of lectures and exercises. You can take a
        free trial lesson before ordering the product.
      </Text>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {lessons.map((lesson: Lesson) => (
          <LessonItem lesson={lesson} key={lesson.id.toString() + "lesson"} />
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
