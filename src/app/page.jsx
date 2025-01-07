"use client";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
} from "firebase/firestore";

const firebaseApp = initializeApp({
  apiKey: "AIzaSyByyhxJd0qiV68V62VyF2Ep8PtCrkwJHvU",
  authDomain: "ap1servidor.firebaseapp.com",
  projectId: "ap1servidor",
});

const Page = () => {
  const [dado, setDado] = useState("");
  const [response, setResponse] = useState("");

  const db = getFirestore(firebaseApp);
  const infoCollectionRef = collection(db, "info");

  async function criarInfo() {
    if (!dado.trim()) {
      setResponse("Por favor, insira um valor válido.");
      return;
    }

    try {
      const docRef = doc(infoCollectionRef, dado);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newCount = docSnap.data().count + 1;
        await updateDoc(docRef, { count: newCount });
        setResponse(`O valor "${dado}" foi enviado ${newCount} vezes.`);
      } else {
        await setDoc(docRef, { count: 1 });
        setResponse(`O valor "${dado}" foi enviado 1 vez.`);
      }
    } catch (error) {
      console.error("Erro ao enviar o dado:", error);
      setResponse("Ocorreu um erro ao enviar o dado. Tente novamente.");
    }
  }


  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <h1 className="text-4x1 font-bold mt-4 mb-4 ">AP1 Servidor</h1>
        <h3 className="text-2x1 text-gray-200 mb-20">
          Daniel da Silva Gonçalves
        </h3>
        <input
          type="text"
          value={dado}
          onChange={(e) => setDado(e.target.value)}
          placeholder="Digite algo"
          className="mb-2 border-2 border-gray-200 rounded-md text-black"
        />
        <button
          onClick={criarInfo}
          type="submit"
          className="border-2 border-blue-600 p-1 bg-blue-500 rounded-md mt-2"
        >
          Enviar
        </button>
        <p className="mt-4">Resposta: {response}</p>
      </div>
    </>
  );
};

export default Page;
