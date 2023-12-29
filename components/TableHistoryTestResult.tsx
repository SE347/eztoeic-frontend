import { HistoricalTestResult } from "@/interface/History";
import { Table, Text } from "@mantine/core";
import React from "react";
import TableItem from "./TableItem";

const TableHistoryTestResult = ({
  historicalTestResults,
}: {
  historicalTestResults: HistoricalTestResult[];
}) => {
  return (
    <div>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date</Table.Th>
            <Table.Th>Result</Table.Th>
            <Table.Th>Score</Table.Th>
            <Table.Th>Time</Table.Th>
            <Table.Th></Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {historicalTestResults.map((e) => (
            <TableItem historicalTestResult={e} key={"part-table" + e.id} />
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

export default TableHistoryTestResult;
