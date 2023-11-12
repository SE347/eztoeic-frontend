import { Question } from "@/interface/Test";
import { Text, Image, Radio } from "@mantine/core";
import { useState } from "react";

function QuestionItem({
  question,
  selectAnswerCount,
  handleAnswerSelection,
}: {
  question: Question;
  selectAnswerCount: number;
  handleAnswerSelection: (index: string, answer: string) => void;
}) {
  const tag: (keyof Question)[] = ["A", "B", "C", "D"];
  const arrayAnswers = Array(selectAnswerCount)
    .fill(0)
    .map((_, i) => question[tag[i]]);
  const [value, setValue] = useState<string | undefined>(undefined);
  return (
    <div style={{ display: "flex", flexDirection: "column", marginTop: 8 }}>
      {question.imageUrl != null ? (
        <Image
          src={"https://study4.com/media/ets2023/img/1/image3.png"}
          alt=""
          w="20%"
          fit="cover"
        />
      ) : (
        <></>
      )}
      {question.audioUrl != null ? (
        <audio controls>
          <source src={question.audioUrl} type="audio/mp4" />
        </audio>
      ) : (
        <></>
      )}
      <Text>
        {question.index}. {question.question}
      </Text>
      <Radio.Group
        withAsterisk
        value={value}
        onChange={(val) => {
          handleAnswerSelection(question.index.toString(), val);
          setValue(val);
        }}
      >
        {arrayAnswers.map((answer, index) => (
          <Radio
            style={{ marginBottom: 6 }}
            value={tag[index]}
            label={`${tag[index]}. ${answer ?? ""}`}
            key={answer}
          />
        ))}
      </Radio.Group>
    </div>
  );
}

export default QuestionItem;
