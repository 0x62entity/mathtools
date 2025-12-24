export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const value = searchParams.get('value');
  const from = searchParams.get('from');
  const to = searchParams.get('to');

  const key = process.env.CURRENCY_KEY;
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${key}/pair/${from}/${to}/${value}`);
  if (!res.ok) {
    return Response.json({"error": res.statusText});
  }
  
  return Response.json(await res.json());
}