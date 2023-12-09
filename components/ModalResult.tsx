import { ResultDetail } from "@/interface/Result";
import { Modal } from "@mantine/core";
import React from "react";
import ResultDetailItem from "./ResultDetailItem";

const ModalResult = ({
  isOpened,
  close,
  result,
}: {
  isOpened: boolean;
  close: () => void;
  result: ResultDetail;
}) => {
  return (
    <Modal
      size="lg"
      styles={{ title: { fontWeight: "bold" } }}
      title={`Answer detail #${result.questionId}`}
      opened={isOpened}
      onClose={close}
      centered
    >
      <ResultDetailItem resultDetail={result} />
    </Modal>
  );
};

export default ModalResult;
