"use client";

import { useState, useEffect } from "react";

interface UserInfo {
  username: string;
  jobTitle: string;
}

export function UserInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [username, setUsername] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        return JSON.parse(stored).username;
      }
    }
    return "";
  });
  const [jobTitle, setJobTitle] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        return JSON.parse(stored).jobTitle;
      }
    }
    return "";
  });
  const [errors, setErrors] = useState({ username: "", jobTitle: "" });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (!storedUserInfo) {
      requestAnimationFrame(() => {
        setIsOpen(true);
      });
    }

    // Listen for edit events
    const handleEdit = () => {
      const stored = localStorage.getItem("userInfo");
      if (stored) {
        const userInfo = JSON.parse(stored);
        setUsername(userInfo.username);
        setJobTitle(userInfo.jobTitle);
        setIsEditMode(true);
        requestAnimationFrame(() => {
          setIsOpen(true);
        });
      }
    };

    window.addEventListener("editUserInfo", handleEdit);
    return () => window.removeEventListener("editUserInfo", handleEdit);
  }, []);

  const validateForm = () => {
    const newErrors = { username: "", jobTitle: "" };
    let isValid = true;

    if (!username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const userInfo: UserInfo = {
        username: username.trim(),
        jobTitle: jobTitle.trim(),
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      setIsOpen(false);
      setIsEditMode(false);
      
      // Trigger storage event for other components to update
      window.dispatchEvent(new Event("userInfoUpdated"));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay p-4">
      <div className="modal-content p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <h2 className="mb-2 text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {isEditMode ? "Edit Your Information" : "Welcome!"}
        </h2>
        <p className="mb-4 sm:mb-6 text-sm text-zinc-600 dark:text-zinc-400">
          {isEditMode ? "Update your information below." : "Please provide your information to continue."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input"
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="jobTitle"
              className="mb-2 block text-sm font-medium text-zinc-900 dark:text-zinc-50"
            >
              Job Title
            </label>
            <input
              type="text"
              id="jobTitle"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="input"
              placeholder="Enter your job title"
            />
            {errors.jobTitle && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.jobTitle}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="btn-primary"
          >
            {isEditMode ? "Save Changes" : "Continue"}
          </button>
          {isEditMode && (
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                setIsEditMode(false);
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
