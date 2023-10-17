"use client";
import ContinuousBanner from "@/components/ContinuousBanner";

export default function MainPage() {
  return (
    <div
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-start",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <ContinuousBanner />
    </div>
  );
}
