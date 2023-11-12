import { Loader } from "@mantine/core";

export default function Loading() {
  return (
    <div
      style={{
        height: "60%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <Loader color="blue" />
    </div>
  );
}
