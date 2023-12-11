import { PartInfo } from "@/app/tests/[id]/page";
import { UnstyledButton, Text, Modal } from "@mantine/core";
import React from "react";
import { useRouter } from "next/navigation";

function PartSolutionItem({
  partInfo,
  testId,
}: {
  partInfo: PartInfo | null;
  testId: string;
}) {
  // const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();
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
            onClick={()=>{router.push(`/tests/1/solution/?part=${partInfo.value}`);}}
          >
            Answer
          </UnstyledButton>
        </div>
      ) : (
        <UnstyledButton
          style={{ color: "var(--mantine-color-blue-filled)" }}
          onClick={()=>{
            const temp = ["1", "2", "3", "4", "5", "6", "7"].map((e) => `part=${e}`);
      const query = temp.join("&");
            router.push(`/tests/1/solution/?${query}`);}}
        >
          See test solution
        </UnstyledButton>
      )}
      {/* <Modal
        opened={opened}
        onClose={close}
        title={partInfo?.name ?? "Solution"}
        size="lg"
        styles={{ title: { fontWeight: "bold" } }}
      >
        <SolutionItem partId={partInfo?.value ?? null} testId={testId} />
      </Modal> */}
    </div>
  );
}

export default PartSolutionItem;
