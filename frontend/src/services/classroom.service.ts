export async function getClassrooms() {
  try {
    const res = await fetch('http://localhost:8080/classrooms')
    const json = await res.json()

    if (!res.ok) {
      return {
        error: json,
        data: null,
      }
    }

    return {
      data: json,
      error: null,
    }
  }
  catch (error) {
    return {
      data: null,
      error,
    }
  }
}
