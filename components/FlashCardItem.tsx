"use client";
import { FlashCards } from "@/interface/Vocab";
import { Card, Text, Image } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

function FlashCardItem({ flashcard }: { flashcard: FlashCards }) {
  const router = useRouter();
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      onClick={() => router.push(`flashcards/lists/${flashcard.id}`)}
    >
      <Card.Section>
        <Image
          src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2020/11/english-vocabulary-fast-effectively.jpg"
          height={160}
          alt="Norway"
        />
      </Card.Section>
      <Text style={{ fontWeight: "bold", fontSize: 24 }}>
        {flashcard.title}
      </Text>
      <Text style={{ color: "gray" }}>{flashcard.description}</Text>
      <Text style={{ fontWeight: "w600", fontSize: 15 }} fw={"600"}>
        {flashcard.vocabCount} vocabs
      </Text>
    </Card>
  );
}

export default FlashCardItem;
