const BASE_URL = "http://localhost:3000/";

export async function getData() {
  try {
    const response = await fetch("http://localhost:3000/menu");
    if (response.status === 200) {
      const data = await response.json();
      return data;
    }
  } catch (err) {
    throw new Error("Error", err.message);
  }
}

export async function postData(method, data) {
  const response = await fetch("http://localhost:3000/requests", {
    method,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Ошибка запроса к серверу");
  }
}
