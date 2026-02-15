# Corrections

Append entries when the user corrects agent behavior. Each entry helps future sessions avoid the same mistake.

Format:

```
### YYYY-MM-DD — <short title>
**Correction:** <what the user said>
**Context:** <why it matters>
```

---

### 2026-02-15 — Committed to wrong branch
**Correction:** Agent committed new Context7 work to `backport-agent-improvements` — a branch that was already pushed and belonged to a previous, unrelated task. The user had to point out the branch mismatch.
**Context:** Before committing, always check that the current branch is appropriate. The commit skill now includes a "Branch sanity check" section covering this. Key signals: branch is up-to-date with its remote (prior work is "done"), branch name doesn't match the commit topic.
