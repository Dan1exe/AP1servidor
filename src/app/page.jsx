"use client";
import { useState } from "react";

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await fetch("LINK AQUI", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: inputValue }),
      });
      if (!result.ok) {
        throw new Error(`Erro do servidor: ${result.statusText}`);
      }
      const data = await result.json();
      setResponse(data.count);
    } catch (error) {
      console.error("Erro ao enviar o valor:", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify=center flex-col"
    >
      <h1 className="text-4x1 font-bold mt-4 mb-4 ">AP1 Servidor</h1>
      <h3 className="text-2x1 text-gray-200 mb-20">
        Daniel da Silva Gonçalves
      </h3>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Digite algo"
        className="mb-2 border-2 border-gray-200 rounded-md text-black"
      />

      <button
        type="submit"
        className="border-2 border-blue-600 p-1 bg-blue-500 rounded-md mt-2"
      >
        Enviar
      </button>
      <p className="mt-4">Resposta: {response}</p>
    </form>
  );
};
export default Page;
