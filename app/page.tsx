"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";

export default function Home() {
  const [urlText, setUrlText] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rawText = urlText;
    console.log(rawText);
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
          {urlText && <p>{urlText}</p>}
        </div>
        <Footer />
      </div>
    </>
  );
}
