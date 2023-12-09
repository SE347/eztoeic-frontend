"use client";
import ContinuousBanner from "@/components/ContinuousBanner";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

import { Table, Badge, Space, Text } from '@mantine/core';

export default function HomePage() {
  // const { isAuthenticated } = useAuth();
  // const router = useRouter();
  // if (!isAuthenticated) {
  //   router.push("/login");
  // } else {
  //   return (
  //     <div
  //       style={{
  //         alignItems: "flex-start",
  //         justifyContent: "flex-start",
  //         paddingLeft: "20px",
  //         paddingRight: "20px",
  //       }}
  //     >
  //       <ContinuousBanner />
  //     </div>
  //   );
  // }

  const tests = [
    {
      name: "Test1",
      list: [
        { id: 1, finishdate: "09/12/2023", result: "69/69", finshtime: '00:00:69', tags: ['Luyện tập', "Part 1", "Part 2"] },
      ]
    },
    {
      name: "Test2",
      list: [
        { id: 1, finishdate: "09/12/2023", result: "69/69", finshtime: '00:00:69', tags: ['Luyện tập', "Part 1", "Part 2"] },
      ]
    },
    {
      name: "Test3",
      list: [
        { id: 1, finishdate: "09/12/2023", result: "69/69", finshtime: '00:00:69', tags: ['Luyện tập', "Part 1", "Part 2"] },
      ]
    }
  ]

  const redenderList = (elements: any[]) => elements.map((element: any) => (
    <Table.Tr key={element.id}>
      <Table.Td>{element.finishdate}<br />{
        element.tags.map((tag: any) => (
          <Badge color="yellow" radius="sm" mr="xs">{tag}</Badge>
        ))
      }</Table.Td>
      <Table.Td>{element.result}</Table.Td>
      <Table.Td>{element.finshtime}</Table.Td>
      <Table.Td><a href="https://www.google.com">Xem chi tiet</a></Table.Td>
    </Table.Tr>
  ))

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
          alignItems: "flex-start",
          justifyContent: "flex-start",
          paddingLeft: "200px",
          paddingRight: "200px",
        }}
      >
        {
          tests.map(test => (
            <div>
              <Text fw={700}>{test.name}</Text>

              <Table>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Ngay lam</Table.Th>
                    <Table.Th>Ket qua</Table.Th>
                    <Table.Th>Thoi giam lam bai</Table.Th>
                    <Table.Th></Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{redenderList(test.list)}</Table.Tbody>
              </Table>
            </div>
          ))
        }

      </div>

    </div>
  );
}
