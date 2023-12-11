import { Question } from "@/interface/Test";
import { Text, Image} from "@mantine/core";

function SolutionItem2({
  question,
  selectAnswerCount,
}: {
  question: Question;
  selectAnswerCount: number;
}) {
  const tag: (keyof Question)[] = ["A", "B", "C", "D"];
  const arrayAnswers = Array(selectAnswerCount)
    .fill(0)
    .map((_, i) => question[tag[i]]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginTop: 15,
        marginBottom: 15,
      }}
    >
      {question.imageUrl != null ? (
        <Image
          src={question.imageUrl}
          alt=""
          w="60%"
          fit="cover"
          style={{ marginTop: 15, marginBottom: 15 }}
        />
      ) : (
        <></>
      )}
      {question.audioUrl != null ? (
        <audio controls style={{ marginBottom: 15 }}>
          <source src={question.audioUrl} type="audio/mp4" />
        </audio>
      ) : (
        <></>
      )}
      <Text>
        {question.index}. {question.question}
      </Text>
        {arrayAnswers.map((answer, index) => (
          <div
            style={{ marginBottom: 6 }}
            // label={`${tag[index]}. ${answer ?? ""}`}
            key={index.toString() + "answer"}
          >
            {`${tag[index]}. ${answer ?? ""}`}
          </div>
        ))}
        <Text style={{ marginTop: 10, color: "#3cb46e" }} fs="italic" fw={700}>
        Correct answer: {question.answer}
      </Text>
    </div>
  );
}

export default SolutionItem2;