export async function onRequestGet({ params, env }) {
  const { name } = params;

  if (name === "config") {
    const row = await env.DB.prepare(
      "SELECT data FROM config WHERE id = 1"
    ).first();

    return Response.json(row ? JSON.parse(row.data) : {});
  }

  if (name === "levels") {
    const { results } = await env.DB.prepare(
      "SELECT * FROM levels ORDER BY rank"
    ).all();

    return Response.json(results.map(l => ({
      ...l,
      victors: JSON.parse(l.victors)
    })));
  }

  if (name === "team") {
    const { results } = await env.DB.prepare(
      "SELECT * FROM team ORDER BY id"
    ).all();

    return Response.json(results.map(g => ({
      ...g,
      members: JSON.parse(g.members)
    })));
  }

  return Response.json({ error: "Not found" }, { status: 404 });
}
