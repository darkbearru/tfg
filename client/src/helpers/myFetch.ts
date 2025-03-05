import { ref } from "vue";
const response = ref({});
const error = ref({});

async function makeRequest(url: string, method: string, body?: never, token?: string) {
  let requestOptions: RequestInit = {
    method: `${method}`,
  };
  if (body) {
    requestOptions = {
      ...requestOptions,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  if (token) {
    requestOptions = {
      ...requestOptions,
      headers: {
        ...requestOptions.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  try {
    const request = await fetch(`http://localhost:3000/api/${url}`, requestOptions);
    response.value = await request.json();
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
}

export default async function myFetch(url: string, body?: any, method: string = 'POST', token?: string) {
  await makeRequest(url, method, body, token);
  return { response, error };
}
