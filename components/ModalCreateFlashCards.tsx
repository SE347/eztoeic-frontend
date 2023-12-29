"use client";
import { Button, Modal, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { axiosInstance } from "@/services/Axios";
import { mutate } from "swr";
function ModalCreateFlashCards({
  isOpened,
  close,
}: {
  isOpened: boolean;
  close: () => void;
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    setIsLoading(true);
    let body = {
      title: title,
      description: desc,
    };
    await axiosInstance.post("flashcards/lists", body);
    mutate("flashcards");
    setTitle("");
    setDesc("");
    setIsLoading(false);
  };

  return (
    <Modal opened={isOpened} onClose={close} title="Add List Vocabs" centered>
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

export default ModalCreateFlashCards;
