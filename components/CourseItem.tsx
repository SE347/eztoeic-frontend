import { Paper, Text, Image } from "@mantine/core";
import classes from "../styles/TestCard.module.css";
import { useRouter } from "next/navigation";
import { Course } from "@/interface/Course";

const CourseItem = ({ course }: { course: Course }) => {
  const router = useRouter();
  return (
    <Paper
      withBorder
      radius="md"
      className={classes.card}
      onClick={() => {
        router.push(`courses/${course.id}`);
      }}
    >
      <Image src={course.thumbnailUrl} />
      <Text fw={600}>{course.title}</Text>
    </Paper>
  );
};

export default CourseItem;
