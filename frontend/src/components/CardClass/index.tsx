"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { ClassTypes } from "@/types";
import { useState } from "react";

interface CardClassProps {
  classe?: ClassTypes;
  action?: () => void;
}

export function CardClass({ classe, action }: CardClassProps) {
  return (
    <Card className="w-[375px] m-5">
      <CardHeader className=" flex items-center justify-center">
        <h1>{classe?.name}</h1>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {classe?.description}
      </CardContent>

      <CardFooter className="flex justify-evenly">
        <Button onClick={action}>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
