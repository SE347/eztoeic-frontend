"use client";
import ContinuousBanner from "@/components/ContinuousBanner";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/login");
  } else {
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
}
