"use client";
import { ResultDetail } from "@/interface/Result";
import React from "react";
import { Box, Modal, Text, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ResultDetailItem from "./ResultDetailItem";

const ResultItem = ({ resultDetail }: { resultDetail: ResultDetail }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <Box
        style={{
          borderRadius: 15,
          paddingLeft: 8,
          paddingRight: 8,
          marginRight: 8,
        }}
        bg={"#ffad3b"}
      >
        <Text>{resultDetail.questionId}</Text>
      </Box>
      <Text style={{marginRight:4}}>{resultDetail.answer}:</Text>
      <RenderAnswer resultDetail={resultDetail} />
      <Box style={{ width: 6 }} />
      <UnstyledButton
        onClick={open}
        style={{ color: "var(--mantine-color-blue-filled)" }}
      >
        [detail]
      </UnstyledButton>
      <Modal
        size="lg"
        styles={{ title: { fontWeight: "bold" } }}
        title={`Answer detail #${resultDetail.questionId}`}
        opened={opened}
        onClose={close}
        centered
      >
        <ResultDetailItem resultDetail={resultDetail} />
      </Modal>
    </div>
  );
};

export default ResultItem;

const RenderAnswer = ({ resultDetail }: { resultDetail: ResultDetail }) => {
  if (resultDetail.answerByUser != null) {
    if (resultDetail.answerByUser == resultDetail.answer)
      return <Text>{resultDetail.answerByUser}</Text>;
    else return <Text td="line-through">{resultDetail.answerByUser}</Text>;
  } else {
    return <Text>Not answered</Text>;
  }
};
