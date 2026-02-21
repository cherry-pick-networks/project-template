import { Hono, type Context } from "hono";
import { z } from "zod";
import { Project } from "ts-morph";

export function add(a: number, b: number): number {
  return a + b;
}

let kvPromise: Promise<Deno.Kv> | null = null;
function getKv(): Promise<Deno.Kv> {
  if (!kvPromise) kvPromise = Deno.openKv();
  return kvPromise;
}

const app = new Hono();

app.get("/", (c: Context) => c.json({ ok: true }));

const KvBodySchema = z.object({ key: z.string(), value: z.unknown() });

app.get("/kv/:key", async (c: Context) => {
  const kv = await getKv();
  const key = c.req.param("key");
  const entry = await kv.get(["kv", key]);
  return c.json(entry.value ?? null);
});

app.post("/kv", async (c: Context) => {
  const body = await c.req.json();
  const parsed = KvBodySchema.safeParse(body);
  if (!parsed.success) {
    return c.json({ error: parsed.error.flatten() }, 400);
  }
  const kv = await getKv();
  await kv.set(["kv", parsed.data.key], parsed.data.value);
  return c.json({ key: parsed.data.key });
});

app.get("/ast", (c: Context) => {
  const project = new Project({ useInMemoryFileSystem: true });
  const source = project.createSourceFile("sample.ts", "const x = 1;");
  const count = source.getVariableDeclarations().length;
  return c.json({ variableDeclarations: count });
});

if (import.meta.main) {
  Deno.serve(app.fetch);
}
