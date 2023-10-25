import { Paper, Text, Button } from "@mantine/core";
import classes from "../styles/TestCard.module.css";
import { useRouter } from "next/navigation";

const TestCard = ({ test }: { test: Test }) => {
  const router = useRouter();
  return (
    <Paper withBorder radius="md" className={classes.card}>
      <Text size="xl" fw={500} mt="md">
        {test.title}
      </Text>
      <Text size="sm" mt="sm" c="dimmed" fw={600}>
        Test set: {test.setTitle}
      </Text>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text size="sm" mt="sm" c="dimmed" fw={600}>
          🕒 {test.time} minutes | {test.sectionCount} part |{" "}
          {test.questionCount} questions
        </Text>
      </div>
      <Button
        fullWidth
        style={{ marginTop: 20 }}
        onClick={() => {
          router.push(`/tests/${test.id}`);
        }}
      >
        Detail
      </Button>
    </Paper>
  );
};

export default TestCard;
