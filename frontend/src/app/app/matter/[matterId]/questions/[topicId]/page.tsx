import type { Question } from "../../entities/question";
import { notFound } from "next/navigation";

interface QuestionParams {
  topicId: string;
}

export default async function Questions({
  params,
}: {
  params: Promise<QuestionParams>;
}) {
  const { topicId } = await params;
  let questions: Question[] = [];
  const data = await fetch(
    `http://localhost:8080/questions?topicId=${topicId}`
  );
  if (data.ok) {
    questions = (await data.json()) as Question[];
  }

  return (
    <div className="flex flex-col justify-center">
      <h1 className="text-4xl font-bold text-center">Perguntas</h1>
      <ul className="list-none list-inside flex flex-col sm:flex-row gap-4 mt-4 ">
        {questions.map((question) => (
          <li key={question.id}>{question.name}</li>
        ))}
      </ul>
    </div>
  );
}
