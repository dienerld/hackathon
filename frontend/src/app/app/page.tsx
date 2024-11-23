"use client";
import { CardClass } from "@/components/CardClass";
import { DialogRegister } from "@/components/DialogRegister";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

const matter = [
  { name: "Matter 1", description: "Lorem ipsum dolor sit amet" },
  { name: "Matter 2", description: "Consectetur adipiscing elit" },
  { name: "Matter 3", description: "Donec id consectetur metus" },
  { name: "Matter 4", description: "Donec id consectetur metus" },
  { name: "Matter 5", description: "Donec id consectetur metus" },
  { name: "Matter 6", description: "Donec id consectetur metus" },
];

export default function App() {
  const [alert, setAlert] = useState(false);
  function handleMatter(id: string) {
    if (id) {
      setAlert(!alert);
      setTimeout();
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-full">
      {alert ? (
        <Alert variant="destructive">
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            Não foi possível encontrar o conteúdo
          </AlertDescription>
        </Alert>
      ) : (
        ""
      )}
      <h1 className="font-semibold text-3xl">Disciplinas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-2 gap-4">
        {matter.map((item) => (
          <CardClass
            classe={item}
            key={item.name}
            action={() => handleMatter(item.name)}
          />
        ))}
      </div>
      <DialogRegister />
    </div>
  );
}
