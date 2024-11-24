import process from 'node:process'

export const envs = {
  SERVER_API_URL: process.env.NEXT_API_URL,
  CLIENT_API_URL: process.env.NEXT_PUBLIC_API_URL,
}
