export async function getApi(api: string) {
  const res = await fetch(`api/${api}`, {
    method: "GET",
  });

  const response = await res.json();
  return response;
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
