"use client";

import { FormEvent, useRef, useState } from "react";
import Spinner from "@/app/components/spinner";
import { CreateChatCompletionResponseChoicesInner } from "openai/api";

export default function SQLInputForm() {
  const abortController = useRef<AbortController>(new AbortController());

  const [isFetching, setIsFetching] = useState(false);
  const [serverResponse, setServerResponse] =
    useState<CreateChatCompletionResponseChoicesInner[]>();
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // abort the previous fetch request
    if (isFetching) abortController.current.abort("User requested again!");

    try {
      setIsFetching(true);
      const input = new FormData(event.target as HTMLFormElement);
      const { signal } = abortController.current;
      const response = await fetch("/api/query", {
        signal,
        body: input,
        method: "POST",
      });
      const data = await response.json();
      setServerResponse(data.response);
    } catch (e: any) {
      if (e.name === "AbortError") {
        console.info("Request canceled, user requested again.");
      } else {
        console.error(e);
      }
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="py-12 space-y-10 max-w-3xl mx-auto flex flex-col items-center"
    >
      <textarea
        className="block bg-gray-300 text-gray-800 font-mono whitespace-pre-wrap outline-0 p-4"
        name="sql_input"
        cols={80}
        rows={10}
      />
      <div className="flex justify-center">
        <button
          type="submit"
          className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Explain it
        </button>
        {isFetching && <Spinner />}
      </div>
      <div>
        {serverResponse?.map((data) => {
          console.log(data);
          return <p key={data.index}>{data.message?.content}</p>;
        })}
      </div>
    </form>
  );
}
