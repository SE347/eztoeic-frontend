"use client";
import { HistoricalTestResult } from "@/interface/History";
import { Table, Badge, UnstyledButton } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

const TableItem = ({
  historicalTestResult,
}: {
  historicalTestResult: HistoricalTestResult;
}) => {
  const router = useRouter();
  let correctCount = historicalTestResult.correctCount;
  let all =
    historicalTestResult.correctCount +
    historicalTestResult.wrongCount +
    historicalTestResult.undoneCount;

  function formatUTCStringToDate(utcString: string): string {
    const date = new Date(utcString);

    const day = ("0" + date.getUTCDate()).slice(-2);
    const month = ("0" + (date.getUTCMonth() + 1)).slice(-2);
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  const formatTime = (timer: number) => {
    const minutes = Math.floor((timer % 3600) / 60).toString();
    const seconds = (timer % 60).toString();
    return `${padStart(minutes, 2, "0")}:${padStart(seconds, 2, "0")}`;
  };
  const padStart = (str: string, len: number, char: string) => {
    while (str.length < len) {
      str = `${char}${str}`;
    }

    return str;
  };

  return (
    <Table.Tr key={historicalTestResult.id}>
      <Table.Td>
        <div
          style={{ width: "38vw", display: "flex", flexDirection: "column" }}
        >
          {formatUTCStringToDate(historicalTestResult.createdAt)}
          <div>
            {historicalTestResult.resultParts.map((part) => (
              <Badge color="yellow" radius="sm" mr="xs">
                Part {part.partNumber}
              </Badge>
            ))}
          </div>
        </div>
      </Table.Td>
      <Table.Td>
        {correctCount}/{all}
      </Table.Td>
      <Table.Td>{historicalTestResult.score}</Table.Td>
      <Table.Td>
        {formatTime(Number.parseInt(historicalTestResult.time))}
      </Table.Td>
      <Table.Td>
        <UnstyledButton
          style={{
            color: "blue",
            fontStyle: "italic",
            textDecoration: "underline",
          }}
          onClick={() =>
            router.push(
              `tests/${historicalTestResult.testId}/results/${historicalTestResult.id}`
            )
          }
        >
          Detail
        </UnstyledButton>
      </Table.Td>
    </Table.Tr>
  );
};

export default TableItem;
