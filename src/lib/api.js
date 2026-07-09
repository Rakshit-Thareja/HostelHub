const jsonHeaders = {
  "Content-Type": "application/json",
};

export async function apiRequest(path, options = {}) {
  const response = await fetch(path, {
    headers: jsonHeaders,
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
