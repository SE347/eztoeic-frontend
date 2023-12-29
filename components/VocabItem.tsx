import { Vocab } from "@/interface/Vocab";
import { Paper, Text } from "@mantine/core";
import React from "react";
import { IconTrash } from "@tabler/icons-react";
import { axiosInstance } from "@/services/Axios";

function VocabItem({ vocab }: { vocab: Vocab }) {
  const remove = async () => {
    const confirmSubmission = window.confirm(
      "Are you sure you want to remove this vocab?"
    );
    if (confirmSubmission) {
      await axiosInstance.delete(`flashcards/vocabs/${vocab.id}`);
      window.location.reload();
    } else {
    }
  };
  return (
    <Paper
      shadow="xs"
      radius="md"
      withBorder
      p="xl"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 8,
        marginTop: 8,
      }}
    >
      <div>
        <Text>{vocab.vocab}</Text>
        <Text>Meaning: {vocab.definition}</Text>
      </div>
      <IconTrash onClick={remove} />
    </Paper>
  );
}

export default VocabItem;
