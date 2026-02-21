# Project context (AI / tooling)

Single source of truth for project description, structure, conventions, and workflow.  
All tools and models should use this file only; do not duplicate these rules in tool-specific configs.

---

## 1. Project and stack

- **Name**: picker
- **Runtime**: Deno
- **Stack**: Hono (HTTP), Zod (validation), ts-morph (AST), Deno KV (storage)
- **Entry**: `main.ts` (Hono app, KV routes, AST demo)

---

## 2. Directory structure and naming

- **Max depth**: 3 tiers from root (prefix → infix → suffix). Root is not counted.
- **Allowed forms**: `prefix/`, `prefix/infix/`, `prefix/infix/suffix/`
- **Naming axes** (use only approved segment names):
  - **Prefix**: Scope (global, shared, system, module, component) or Layer or Context
  - **Infix**: Actor, Action, or Entity (e.g. prompt, document, service)
  - **Suffix**: Artifact, Policy, or Meta (e.g. store, config, test)
- **This file**: `shared/prompt/context.md` (shared = Scope, prompt = Entity)
- **Exceptions**: .git, .cursor, node_modules, dist, build, coverage, vendor, .cache (confirm per repo)
- Do not add a fourth tier. Do not use forbidden segments (e.g. core in Context; cache as Suffix).

---

## 3. Run, build, test

- **Dev server**: `deno task dev` (runs `deno run --allow-net --unstable-kv --watch main.ts`)
- **Run once**: `deno run --allow-net --unstable-kv main.ts`
- **Test**: Add and run tests via `deno test`; keep commands in `deno.json` tasks if needed.
- **Lint/format**: Use project lint/format config if present; otherwise `deno lint`, `deno fmt`.

---

## 4. Coding and commit conventions

- **Language**: English only for code, comments, docstrings, UI/log strings, and docs.
- **Commit message**: `<type>[(scope)]: <description>`; imperative, lowercase.  
  Types: feat, fix, docs, chore, refactor, perf, test, ci, build. Scope optional (e.g. module or feature flag).
- **Dependencies**: Add only from the project’s official list (e.g. deno.json imports); update that list first. No new deps without approval and stable-library criteria.
- **Scope**: Do not add modules, API routes, or infrastructure unless they are in the scope document; update the scope doc first, then implement.
- **Conventions**: Follow existing formatting, naming, and structure; prefer the simplest option (KISS); be consistent.

---

## 5. Frequently used commands

- `deno task dev` — start dev server with watch
- `deno run --allow-net --unstable-kv main.ts` — run server once
- `deno test` — run tests
- `gh pr create --draft` — create draft PR (review before marking ready)
- `gh pr view`, `gh pr diff` — inspect PR for review
- `gh run view` — inspect CI run (e.g. after failure)
- `git worktree add <path> <branch>` — work on another branch in a separate directory
- `realpath <path>` — resolve absolute path when referring to files outside current tree

---

## 6. Development workflow

- **Decompose**: Break large work into small steps (A → A1, A2, A3 → B). Tackle one step at a time.
- **Plan then prototype**: Decide high-level approach and structure before coding; use a short plan or prototype to validate approach.
- **Write–test cycle**: Implement, run tests (or manual check), fix failures, repeat. For automation, define how to verify results.
- **TDD (optional)**: Write failing tests first, commit tests, then implement until they pass.
- **Verify output**: For research or non-code output, ask to verify claims and summarize (e.g. table of what was verified).

---

## 7. Git, PR, CI

- Use **Git** and **GitHub CLI (`gh`)** for commits, branches, pull, and PRs. Any AI that can run the terminal uses the same commands.
- **Draft PRs**: Create with `gh pr create --draft`; review; then mark ready. Prefer draft PRs for agent-generated changes.
- **Parallel work**: Use `git worktree add` when working on multiple branches; one worktree per branch/dir.
- **PR review**: Use `gh pr view` and `gh pr diff`; review file-by-file or step-by-step as needed.
- **CI failure**: Use `gh run view`, logs, and (if needed) `gh` GraphQL/API to find root cause, flakiness, or breaking commit.
- **Dangerous commands**: Audit approved commands periodically (e.g. patterns like `rm -rf`, `sudo`, `chmod 777`, `curl | sh`, `git reset --hard`). Prefer a script or checklist; do not approve broad destructive permissions.

---

## 8. Integrations and long-running work

- **MCP**: Prefer MCP servers for integrations so any MCP-capable client can reuse them when the model or client changes.
- **Browser automation**: Use Playwright (or similar); document usage here if the project uses it.
- **Paths**: When referring to files outside the current tree, use `realpath` (or equivalent) to pass absolute paths.
- **Long-running jobs**: For CI/build or external waits, use manual exponential backoff (e.g. check at 1m, 2m, 4m, …) instead of one long wait.

---

## 9. Context and handoff

- **New topic**: Start a new conversation when the topic or task changes to keep context focused.
- **Handoff**: For long-running or multi-session work, write a single handoff doc (e.g. `shared/prompt/handoff.md` or root `HANDOFF.md`) with: goal, progress, what was tried, what failed, next steps. New sessions attach only that file to continue.
- **Branching experiments**: When trying a different approach from a point in time, fork the conversation or record the branch point in the handoff doc.

---

## 10. Input and output

- **Inaccessible or private content**: If a URL or resource cannot be fetched directly, use “select all → copy → paste” into the chat (or attach the file).
- **Output format**: Prefer Markdown for reports and docs; use a neutral format (e.g. paste via Notion) when copying to platforms that do not accept Markdown.
- **Getting output out**: Copy from terminal, or write to a file and open in editor; use `/copy` or equivalent if the tool provides it.

---

## 11. Quality and safety

- **Abstraction level**: Choose the right depth: high-level for one-off or low-risk work; file/function/deps-level for critical or complex code.
- **Simplify**: Ask “why this change?” or “simplify unnecessary parts” when the change set is large or unclear. Prefer minimal, clear code and prose.
- **Dangerous commands**: Do not approve broad or destructive commands without explicit need; audit approved commands periodically (see §7).

---

## 12. Maintenance

- **Single source**: Add or change rules and habits only in this file (`shared/prompt/context.md`). Do not duplicate in Cursor Rules or other tool configs; reference this file instead.
- **Review**: Review this file periodically (e.g. quarterly); add repeated instructions as they appear; remove or update outdated lines.
- **External tips**: Use external guides (e.g. claude-code-tips) as reference only; write only the chosen practices here.