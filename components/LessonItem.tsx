import { Paper, Text, Image } from "@mantine/core";
import { Lesson } from "@/interface/Course";

const LessonItem = ({ lesson }: { lesson: Lesson }) => {
  return (
    <Paper
      withBorder
      radius="md"
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        padding: 20,
      }}
    >
      <iframe
        // width="560"
        // height="315"
        src={lesson.videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
        allowFullScreen
      ></iframe>
      <Text fw={600} style={{ marginTop: 10 }}>
        {lesson.title}
      </Text>
    </Paper>
  );
};

export default LessonItem;
