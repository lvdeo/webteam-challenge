"use client";

import { useEffect, useState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { ContentList } from "../../components/content-list";

export default function InformationPage() {
  const [userInfo, setUserInfo] = useState<{ username: string; jobTitle: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      startTransition(() => {
        setUserInfo(JSON.parse(storedUserInfo));
      });
    } else {
      router.push("/");
    }
  }, [router]);

  // Always show loading state initially to match server render
  if (!userInfo) {
    return (
      <div className="page-container flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container p-4 pb-32 sm:p-6 sm:pb-36 md:p-8 md:pb-40">
      <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-subheading">
              Information Page
            </h1>
            <p className="mt-1 sm:mt-2 text-secondary">
              Browsing as {userInfo.username}
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="btn-small self-start sm:self-auto"
          >
            Back to Home
          </button>
        </div>

        <ContentList />
      </div>
    </div>
  );
}
