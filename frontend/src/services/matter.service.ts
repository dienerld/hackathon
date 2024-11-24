export async function getMatters(externalId: string) {
  try {
    const res = await fetch(`http://localhost:8080/matters?externalId=${externalId}`)
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
  catch (error) {
    return {
      error,
      data: null,
    }
  }
}
