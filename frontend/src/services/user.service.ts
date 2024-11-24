interface User {
  firstName: string
  lastName: string
  email: string
  externalId: string
  classroomId: string
}

export async function registerUser(user: User) {
  try {
    const res = await fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

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
  catch (error: any) {
    return {
      data: null,
      error,
    }
  }
}
