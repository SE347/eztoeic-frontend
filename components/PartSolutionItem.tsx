import { PartInfo } from "@/app/tests/[id]/page";
import { UnstyledButton, Text, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import SolutionItem from "./SolutionItem";

function PartSolutionItem({
  partInfo,
  testId,
}: {
  partInfo: PartInfo | null;
  testId: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div>
      {partInfo !== null ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: 10,
          }}
        >
          <Text>•{partInfo!.name}:</Text>
          <UnstyledButton
            style={{ color: "var(--mantine-color-blue-filled)", marginLeft: 6 }}
            onClick={open}
          >
            Answer
          </UnstyledButton>
        </div>
      ) : (
        <UnstyledButton
          style={{ color: "var(--mantine-color-blue-filled)" }}
          onClick={open}
        >
          See test solution
        </UnstyledButton>
      )}
      <Modal
        opened={opened}
        onClose={close}
        title={partInfo?.name ?? "Solution"}
        size="lg"
        styles={{ title: { fontWeight: "bold" } }}
      >
        <SolutionItem partId={partInfo?.value ?? null} testId={testId} />
      </Modal>
    </div>
  );
}

export default PartSolutionItem;
