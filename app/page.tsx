"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const [urlText, setUrlText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [alias, setAlias] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorText("");
    setAlias("");

    try {
      const response = await fetch("/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urlText }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "An error occured");
      }

      setAlias(data.shortUrl);
      setUrlText("");
    } catch (error) {
      console.log(`Error shortening url, ${error}`);
      setErrorText(
        error instanceof Error ? error.message : "An unexpected error occured"
      );
    }
  };

  const reset = () => {
    setUrlText("");
    setErrorText("");
    setAlias("");
  };

  return (
    <>
      <div className="h-screen flex flex-col justify-between items-center p-2">
        <Header />
        <div className="flex flex-col gap-4 border p-16 rounded-xl">
          <h1 className="text-5xl font-bold">Teeny URL</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name=""
              id=""
              value={urlText}
              onChange={(e) => {
                setUrlText(e.target.value);
              }}
              className="border border-gray-300 rounded-xl py-2 px-4"
              placeholder="Enter your url here"
            />
            <button className="bg-violet-500 text-white py-2 px-4 rounded-xl">
              Shorten URL
            </button>
          </form>
          {errorText && (
            <div className="text-center">
              <p>Error 🚨 {errorText} </p>
            </div>
          )}
          {alias && (
            <div className="text-center">
              <p>Congrats! Here&apos;s your shortened url 🎉</p>
              <p className="text-violet-300">
                <a href={alias}>{alias}</a>
              </p>
              <p
                className="mt-4 text-center hover:text-violet-400 hover:cursor-pointer"
                onClick={reset}
              >
                Convert another?
              </p>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </>
  );
}
