"use client";
import FlashCardItem from "@/components/FlashCardItem";
import Loading from "@/components/Loading";
import ModalCreateFlashCards from "@/components/ModalCreateFlashCards";
import { FlashCards } from "@/interface/Vocab";
import { axiosInstance } from "@/services/Axios";
import { Button, SimpleGrid, Image, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import useSWR from "swr";

export default function FlashCardsPage() {
  const [flashcards, setFlashcards] = useState<FlashCards[]>([]);
  const [opened, { open, close }] = useDisclosure(false);
  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };
  const { data, error, isLoading } = useSWR(`flashcards`, fetcher, {
    onSuccess: (data) => {
      setFlashcards(data.flashcards);
    },
  });

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
        Flashcards
      </Text>
      <Text style={{ marginBottom: 20 }} fs="italic">
        Vocabulary Building: Flashcards present users with a range of English
        words, phrases, or sentences, facilitating the expansion of vocabulary
        across various topics and contexts.
      </Text>
      <Button
        onClick={open}
        style={{
          width: 120,
          alignSelf: "flex-end",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        Create
      </Button>
      <SimpleGrid cols={{ base: 1, sm: 3 }}>
        {flashcards.map((flashcard: FlashCards) => (
          <FlashCardItem
            flashcard={flashcard}
            key={"flaskcard" + flashcard.id}
          />
        ))}
      </SimpleGrid>
      <ModalCreateFlashCards isOpened={opened} close={close} />
    </div>
  );
}
