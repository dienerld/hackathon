import { env } from "@env";
import { fastifyInstance } from "./app";

async function bootstrap() {
  await fastifyInstance.listen({ host: env.HOST, port: env.PORT });
  console.log(fastifyInstance.printRoutes());
  console.log(`HTTP server runningo on http://${env.HOST}:${env.PORT}`);
}

bootstrap();
