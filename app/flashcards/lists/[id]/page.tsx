"use client";
import Loading from "@/components/Loading";
import ModalAddVocab from "@/components/ModalAddVocab";
import ModalEditFlashCards from "@/components/ModalEditFlashCard";
import VocabItem from "@/components/VocabItem";
import { FlashCards } from "@/interface/Vocab";
import { axiosInstance } from "@/services/Axios";
import { Button, Image, Text, UnstyledButton } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from "swr";

export default function ListVocabsPage() {
  const [flashcard, setFlashcard] = useState<FlashCards>();
  const params = useParams();
  const [opened1, setOpen1] = useState(false);
  const [opened2, setOpen2] = useState(false);
  const router = useRouter();

  const fetcher = async (url: string) => {
    let res = await axiosInstance.get(url);
    return res.data;
  };

  const { data, error, isLoading } = useSWR(
    `flashcards/lists/${params.id}`,
    fetcher,
    {
      onSuccess: (data) => {
        setFlashcard(data);
      },
    }
  );

  const remove = async () => {
    const confirmSubmission = window.confirm(
      "Are you sure you want to remove this list?"
    );
    if (confirmSubmission) {
      await axiosInstance.delete(`flashcards/lists/${flashcard?.id}`);
      router.back();
    } else {
    }
  };

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
      <ModalAddVocab
        flashcard={data}
        isOpened={opened1}
        close={() => {
          setOpen1(false);
        }}
      />
      <ModalEditFlashCards
        flashcard={flashcard}
        isOpened={opened2}
        close={() => {
          setOpen2(false);
        }}
      />
      <Image src={"/banner.jpg"} style={{ marginTop: 20, marginBottom: 10 }} />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 28 }} fw={700}>
          Flashcards: {flashcard?.title}
        </Text>
        <div>
          <Button onClick={() => setOpen2(true)}>Edit</Button>
          <Button style={{ marginLeft: 15 }} onClick={() => setOpen1(true)}>
            Add vocab
          </Button>
        </div>
      </div>
      <Text style={{ marginBottom: 20 }} fs={"italic"}>
        {flashcard?.description}
      </Text>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <Text>
          List has {flashcard?.vocabs.length!}{" "}
          {flashcard?.vocabs.length! > 1 ? "vocabs" : "vocab"}
        </Text>
        <UnstyledButton style={{ color: "red" }} onClick={remove}>
          Remove this list
        </UnstyledButton>
      </div>
      {flashcard?.vocabs.map((e) => (
        <VocabItem vocab={e} key={"vocab" + e.id} />
      ))}
    </div>
  );
}
