export async function getApi(api: string) {
  const response = await fetch(`api/${api}`, {
    method: "GET",
  });

  const json = await response.json();
  return json;
}
export async function postApi(api: string, body: any) {
  const response = await fetch(`api/${api}`, {
    method: "POST",
    body: JSON.stringify({
      ...body,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  return json;
}

export async function getJson(url: string) {
  const response = await fetch(url, {
    method: "GET",
  });
  const json = await response.json();
  return json;
}
export async function postJson(url: string, any: any) {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(any),
  });
  const json = await response.json();
  return json;
}
