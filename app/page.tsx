"use client";

import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<{ username: string; jobTitle: string } | null>(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      startTransition(() => {
        setUserInfo(JSON.parse(storedUserInfo));
      });
    }
  }, []);

  useEffect(() => {
    const handleUpdate = () => {
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        startTransition(() => {
          setUserInfo(JSON.parse(storedUserInfo));
        });
      }
    };

    window.addEventListener("userInfoUpdated", handleUpdate);
    return () => window.removeEventListener("userInfoUpdated", handleUpdate);
  }, []);

  const handleEditInfo = () => {
    window.dispatchEvent(new Event("editUserInfo"));
  };

  const handleClearData = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
  };

  return (
    <div className="page-container p-4 pb-24 sm:p-6 md:p-8">
      <div className="content-wrapper">
        {/* Hero Section */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-heading mb-4">
            WebTeam Challenge
          </h1>
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Explore the Rick and Morty multiverse. Browse characters, view details, and discover episodes.
          </p>
        </div>

        {userInfo ? (
          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {/* User Profile Card */}
            <div className="card p-6 lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-1">
                    Welcome back, {userInfo.username}! 👋
                  </h2>
                  <p className="text-secondary">{userInfo.jobTitle}</p>
                </div>
                <button
                  onClick={handleEditInfo}
                  className="btn-small"
                  title="Edit profile"
                >
                  ✏️ Edit
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 p-4 bg-zinc-50 rounded-lg dark:bg-zinc-900">
                <div>
                  <p className="text-label mb-1">Username</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {userInfo.username}
                  </p>
                </div>
                <div>
                  <p className="text-label mb-1">Job Title</p>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-50">
                    {userInfo.jobTitle}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="card p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                  Quick Actions
                </h3>
                <p className="text-secondary text-sm mb-4">
                  Navigate and manage your experience
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => router.push("/information")}
                  className="w-full btn-primary flex items-center justify-center gap-2"
                >
                  <span>🚀</span>
                  <span>Browse Characters</span>
                </button>
                <button
                  onClick={handleClearData}
                  className="w-full btn-secondary text-sm"
                >
                  Reset Profile
                </button>
              </div>
            </div>

            {/* Feature Card */}
            <div className="card p-6 md:col-span-2 lg:col-span-3">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                What's Inside
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-xl">
                    👥
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm mb-1">
                      800+ Characters
                    </p>
                    <p className="text-xs text-secondary">
                      Explore the entire cast
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-xl">
                    📺
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm mb-1">
                      Episode Details
                    </p>
                    <p className="text-xs text-secondary">
                      View character appearances
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xl">
                    🔍
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm mb-1">
                      Smart Search
                    </p>
                    <p className="text-xs text-secondary">
                      Paginated browsing experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <div className="card p-8">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                Welcome!
              </h2>
              <p className="text-secondary mb-6">
                Please complete your profile to start exploring the Rick and Morty universe
              </p>
              <div className="loading-spinner mb-4"></div>
              <p className="text-sm text-secondary">Setting up your profile...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
