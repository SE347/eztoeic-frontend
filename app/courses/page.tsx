// "use client";
// import Loading from "@/components/Loading";
// import TestCard from "@/components/TestCard";
// import { Course } from "@/interface/Course";
// import { TestInfo } from "@/interface/Test";
// import { axiosInstance } from "@/services/Axios";
// import { Button, Pagination, SimpleGrid, TextInput } from "@mantine/core";
// import { useState } from "react";
// import useSWR from "swr";

// export default function CoursesPage() {
//   const [tests, setTests] = useState<TestInfo[]>([]);
//   const [searchText, setSearchText] = useState<string>("ets");
//   const [searchTerm, setSearchTerm] = useState<string>("");
//   // const [pageCount, setPageCount] = useState<number>(1);
//   const [activePage, setPage] = useState(1);
//   const fetcher = async (url: string) => {
//     let res = await axiosInstance.get(url);
//     return res.data;
//   };
//   const { data, error, isLoading } = useSWR<Course[]>(
//     `/tests?page=${pageCount}&search=${searchText}`,
//     fetcher,
//     {
//       onSuccess: (data) => {
//         // setTests(data.tests);
//         // setPage(data.pageCount);
//       },
//     }
//   );
//   if (error) return <div>{error.message}</div>;
//   if (isLoading) return <Loading />;
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         paddingLeft: "15vw",
//         paddingRight: "15vw",
//       }}
//     >
//       <TextInput
//         placeholder="Enter search tests..."
//         value={searchTerm}
//         onChange={(event) => setSearchTerm(event.currentTarget.value)}
//       />
//       <Button
//         style={{ width: 100, marginTop: 15, marginBottom: 15 }}
//         onClick={() => {
//           setSearchText(searchTerm);
//         }}
//       >
//         Search
//       </Button>
//       <SimpleGrid cols={{ base: 1, sm: 3 }}>
//         {tests.map((test: TestInfo) => (
//           <TestCard test={test} key={test.id.toString() + "test"} />
//         ))}
//       </SimpleGrid>
//       <div style={{ alignSelf: "flex-start", marginTop: 20 }}>
//         <Pagination
//           value={activePage}
//           onChange={setPage}
//           total={pageCount ?? 1}
//         />
//       </div>
//     </div>
//   );
// }
