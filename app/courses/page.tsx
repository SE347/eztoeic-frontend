"use client";
import CourseItem from "@/components/CourseItem";
import Loading from "@/components/Loading";
import { Course } from "@/interface/Course";
import { axiosInstance } from "@/services/Axios";
import {
  Button,
  Pagination,
  SimpleGrid,
  TextInput,
  Image,
  Text,
} from "@mantine/core";
import { useState } from "react";
import useSWR from "swr";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(1);
  const [activePage, setPage] = useState(1);
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR(
    `playlists?page=${activePage}&search=${searchText}`,
    fetcher,
    {
      onSuccess: (data) => {
        setCourses(data.playlists);
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
      <Text style={{ fontSize: 28 }} fw={700}>
        Online course
      </Text>
      <Text style={{ marginBottom: 20 }} fs="italic">
        STUDY4's high-quality online English courses are designed according to
        the CEFR standard English program (A1-C2) of Cambridge and Oxford
        universities (UK) with a rich and diverse system of lectures and
        exercises. You can take a free trial lesson before ordering the product.
      </Text>
      <TextInput
        placeholder="Enter search courses..."
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
        {courses.map((course: Course) => (
          <CourseItem course={course} key={course.id.toString() + "course"} />
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
