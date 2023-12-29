"use client";
import { Button, Modal, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/services/Axios";
import { FlashCards } from "@/interface/Vocab";
import { mutate } from "swr";

function ModalEditFlashCards({
  flashcard,
  isOpened,
  close,
}: {
  flashcard: FlashCards | undefined;
  isOpened: boolean;
  close: () => void;
}) {
  const [title, setTitle] = useState(flashcard?.title);
  const [desc, setDesc] = useState(flashcard?.description);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(flashcard?.title);
    setDesc(flashcard?.description);
  }, [flashcard]);

  const submit = async () => {
    setIsLoading(true);
    let body = {
      title: title,
      description: desc,
    };
    await axiosInstance.post(`flashcards/lists/${flashcard?.id}`, body);
    mutate(`flashcards/lists/${flashcard?.id}`);
    setIsLoading(false);
  };

  return (
    <Modal opened={isOpened} onClose={close} title="Edit Flashcard" centered>
      <TextInput
        value={title}
        onChange={(event) => setTitle(event.currentTarget.value)}
        label="Title"
        placeholder="Enter your list title"
        inputWrapperOrder={["label", "error", "input", "description"]}
      />
      <TextInput
        value={desc}
        onChange={(event) => setDesc(event.currentTarget.value)}
        label="Description"
        placeholder="Enter your list description"
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

export default ModalEditFlashCards;
