import { ResultDetail } from "@/interface/Result";
import { Text, Image, Radio } from "@mantine/core";
import { useState } from "react";
import { answerCountOfPart } from "@/constants/AppConstants";

function ResultDetailItem({ resultDetail }: { resultDetail: ResultDetail }) {
  const tag: (keyof ResultDetail)[] = ["A", "B", "C", "D"];
  const arrayAnswers = Array(answerCountOfPart[resultDetail.partNumber])
    .fill(0)
    .map((_, i) => resultDetail[tag[i]]);
  const [value, setValue] = useState<string | undefined>(
    resultDetail.answerByUser ?? undefined
  );
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      {resultDetail.imageUrl != null ? (
        <Image src={resultDetail.imageUrl} alt="" w="20%" fit="cover" />
      ) : (
        <></>
      )}
      {resultDetail.audioUrl != null ? (
        <audio controls>
          <source src={resultDetail.audioUrl} type="audio/mp4" />
        </audio>
      ) : (
        <></>
      )}
      <Text style={{ marginTop: 10, marginBottom: 10 }}>
        {resultDetail.questionId}. {resultDetail.question}
      </Text>
      <Radio.Group withAsterisk value={value}>
        {arrayAnswers.map((answer, index) => (
          <Radio
            style={{ marginBottom: 6 }}
            value={tag[index]}
            label={`${tag[index]}. ${answer ?? ""}`}
            key={index.toString() + "answer"}
          />
        ))}
      </Radio.Group>
      <Text style={{ marginTop: 15, color: "#3cb46e" }} fs="italic" fw={700}>
        Correct answer: {resultDetail.answer}
      </Text>
    </div>
  );
}

export default ResultDetailItem;
