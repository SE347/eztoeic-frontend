"use client";
import { Button, Modal, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { axiosInstance } from "@/services/Axios";
import { FlashCards } from "@/interface/Vocab";
import { mutate } from "swr";
function ModalAddVocab({
  flashcard,
  isOpened,
  close,
}: {
  flashcard: FlashCards | undefined;
  isOpened: boolean;
  close: () => void;
}) {
  const [vocab, setVocab] = useState("");
  const [meaning, setMeaning] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submit = async () => {
    let body = {
      vocab: vocab,
      definition: meaning,
    };
    setIsLoading(true);
    await axiosInstance.post(`flashcards/lists/${flashcard!.id}/vocabs`, body);
    setIsLoading(false);
    mutate(`flashcards/lists/${flashcard?.id}`);
    setVocab("");
    setMeaning("");
  };

  return (
    <Modal opened={isOpened} onClose={close} title="Add Vocab" centered>
      <TextInput
        value={vocab}
        onChange={(event) => setVocab(event.currentTarget.value)}
        label="New vocab"
        placeholder="Enter new vocab"
        inputWrapperOrder={["label", "error", "input", "description"]}
      />
      <TextInput
        value={meaning}
        onChange={(event) => setMeaning(event.currentTarget.value)}
        label="Meaning"
        placeholder="Enter meaning of vocab"
        inputWrapperOrder={["label", "error", "input", "description"]}
      />
      <Button
        onClick={submit}
        loading={isLoading}
        fullWidth
        style={{ marginTop: 20 }}
      >
        Submit
      </Button>
    </Modal>
  );
}

export default ModalAddVocab;
