# BATCH-REFINE AGENT — PARALLEL MULTI-SITE REVIEW & REFINEMENT

You receive a list of already-built web folders and run review + refine for each one,
in parallel, as completely independent processes.

**Input:** `$ARGUMENTS` — list of paths to web folders separated by commas or line breaks.
Each path can include specific instructions with `| instructions` after the path.

Examples:
```
/batch-refine web/business-1/, web/business-2/, web/business-3/
/batch-refine web/business-1/ | fix header, web/business-2/, web/business-3/ | fix form
```

---

## FLOW FOR EACH SITE

Each folder goes through this mini-pipeline, in order:

```
/web-review web/<business>/
    ↓
(if review ≠ A) /web-refine web/<business>/ | <instructions from review>
    ↓
/deploy web/<business>/ <business>
```

---

## PARALLEL EXECUTION

**CRITICAL: Each site MUST be executed as an independent agent using the Agent tool.**

For each path in the list:

1. **Parse paths and instructions** — split by commas or line breaks. For each entry, if it contains `|`, split into `path | instructions`. Trim spaces.
2. **Launch one Agent per path** — use the Agent tool with these parameters:
   - `description`: "Review+Refine: <business-name>"
   - `prompt`: The full pipeline prompt (see template below)
   - Launch ALL agents in a single call (parallel tool calls)

### Prompt template for each Agent:

```
Run review + refine for this website. Work in the directory /Users/et59866/agencia/Agency-dev/

IMPORTANT: Each step must be executed sequentially. Do not advance to the next step until the previous one is complete.

Manual user instructions (may be empty): <MANUAL_INSTRUCTIONS>

## Step 1: Review
Run the /web-review skill with the path: <PATH>
Read the review output. Capture the quality grade (A/B/C) and the generated instructions.

## Step 2: Refine (conditional)
If the review did NOT give quality "A" OR if there are manual user instructions, run the /web-refine skill.
- If there are both manual AND review instructions: combine both. Format: /web-refine <PATH> | <review instructions> + <manual instructions>
- If there are only manual instructions (review gave "A"): /web-refine <PATH> | <manual instructions>
- If there are only review instructions: /web-refine <PATH> | <review instructions>
- If it gave "A" and there are NO manual instructions: skip this step.

## Step 3: Deploy
Run the /deploy skill with: web/<business>/ <business>
This will deploy the site or redeploy it if a previous deployment already existed.
Capture the production URL.

## Final output
When finished, respond EXACTLY with this format:
REVIEW+REFINE COMPLETED: <business-name> → Quality: <A|B|C> → Refined: <Yes|No> → <deploy-url>
```

---

## MONITORING AND FINAL RESULT

After launching all agents:

1. **Wait** for all agents to complete
2. **Collect** the results from each one
3. **Generate the summary table** with this format:

```
BATCH-REFINE COMPLETED: X/Y sites reviewed and deployed

| Business | Quality | Refined | Deploy URL |
|---|---|---|---|
| business-1 | B → refined | Yes | https://business-1.vercel.app |
| business-2 | A | No | https://business-2.vercel.app |
| ... | ... | ... | ... |

Failed (if any):
- business-X: [failure reason]
```

---

## RULES

- **Total isolation** — each Agent works on its site without knowing about the others
- **Do not mix contexts** — never pass data from one site to another
- **Fault tolerance** — if one site fails, the others continue. Report the failure at the end.
- **Maximum 10 paths** per batch — if there are more, reject with: "BATCH-REFINE: maximum 10 paths per execution"
- **No intermediate confirmations** — the pipeline runs from start to finish without requesting input
- Zero extra conversation — only the final table
