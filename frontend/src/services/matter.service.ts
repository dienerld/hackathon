import type { Matter } from '@/types'
import { envs } from '@/envs'

interface Response {
  data: Matter[] | null
  error: {
    message: string
  } | null
}
export async function getMatters(externalId: string | undefined): Promise<Response> {
  if (!externalId) {
    return {
      error: {
        message: 'externalId is required',
      },
      data: null,
    }
  }
  try {
    const res = await fetch(`${envs.SERVER_API_URL}/matters?externalId=${externalId}`)
    const json = await res.json()

    if (!res.ok) {
      return {
        error: json,
        data: null,
      }
    }

    return {
      error: null,
      data: json,
    }
  }
  catch (error: any) {
    return {
      error: {
        message: error.message || 'Erro ao buscar as matérias',
      },
      data: null,
    }
  }
}
