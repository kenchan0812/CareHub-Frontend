"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const TopHeader = () => {
  const router = useRouter();
  const backButton = () => {
    router.push("/customer/dashboard");
  };
  return (
    <div className="flex justify-between pb-6">
      <Button variant="outline" onClick={backButton}>
        Back
      </Button>
    </div>
  );
};

export default TopHeader;
