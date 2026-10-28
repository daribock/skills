# darikletter skills

My agent skills for everyday engineering work. Based on [mattpocock/skills](https://github.com/mattpocock/skills) (MIT), trimmed to the skills I use and adapted to how I work.

## Installation

### Claude Code (plugin, updates itself)

```bash
claude plugin marketplace add daribock/skills
claude plugin install darikletter@daribock
```

### Any agent (editable files, manual updates)

```bash
npx skills@latest add daribock/skills
```

Include `setup-darikletter-skills` when the installer asks which skills to take. Pick one install method per agent: installing both gives you every skill twice.

### Then, once per repo

Run `/setup-darikletter-skills`. It asks which issue tracker you use, which triage labels you apply and where domain docs live.

## The main flow

1. **Align**: `/grill-with-docs` (or `/grill-me` for non-code topics)
2. **Plan**: `/to-spec`, then `/to-tickets`
3. **Build**: `/implement`, which drives `tdd` and finishes with `code-review`
4. **Fix**: `diagnosing-bugs`
5. **Ship**: `pr`

## Reference

**User-invoked** skills run only when you type them. **Model-invoked** skills can also be picked up by the agent when the task fits.

### Engineering

**User-invoked**

- **[grill-with-docs](./skills/engineering/grill-with-docs/SKILL.md)**: Grilling session that also builds the project's domain model, updating `GLOSSARY.md` and ADRs inline.
- **[to-spec](./skills/engineering/to-spec/SKILL.md)**: Turn the current conversation into a spec and publish it to the issue tracker.
- **[to-tickets](./skills/engineering/to-tickets/SKILL.md)**: Break a plan or spec into tracer-bullet tickets with blocking edges.
- **[implement](./skills/engineering/implement/SKILL.md)**: Build the work in a spec or tickets, driving `tdd` and closing out with `code-review`.
- **[triage](./skills/engineering/triage/SKILL.md)**: Move issues through a state machine of triage roles and write agent-ready briefs.
- **[setup-darikletter-skills](./skills/engineering/setup-darikletter-skills/SKILL.md)**: Configure a repo for these skills (issue tracker, triage labels, domain docs).

**Model-invoked**

- **[tdd](./skills/engineering/tdd/SKILL.md)**: Test-driven development with a red-green-refactor loop.
- **[code-review](./skills/engineering/code-review/SKILL.md)**: Two-axis review (Standards and Spec) of the changes since a fixed point.
- **[codebase-design](./skills/engineering/codebase-design/SKILL.md)**: Vocabulary and discipline for designing deep modules.
- **[domain-modeling](./skills/engineering/domain-modeling/SKILL.md)**: Build and sharpen the domain model in `GLOSSARY.md` and ADRs.
- **[diagnosing-bugs](./skills/engineering/diagnosing-bugs/SKILL.md)**: Disciplined diagnosis loop for hard bugs and performance regressions.
- **[prototype](./skills/engineering/prototype/SKILL.md)**: Build a throwaway prototype to answer a design question.
- **[pr](./skills/engineering/pr/SKILL.md)**: The shape a pull request body should take.

### Productivity

**User-invoked**

- **[grill-me](./skills/productivity/grill-me/SKILL.md)**: Get interviewed about a plan or design until every branch is resolved.
- **[handoff](./skills/productivity/handoff/SKILL.md)**: Compact the conversation into a handoff document for another agent.
- **[teach](./skills/productivity/teach/SKILL.md)**: Learn a new skill or concept over multiple sessions in this workspace.

**Model-invoked**

- **[grilling](./skills/productivity/grilling/SKILL.md)**: The interview primitive behind `grill-me`, `grill-with-docs` and `triage`.
- **[writing-for-agents](./skills/productivity/writing-for-agents/SKILL.md)**: How to write skills, `AGENTS.md`/`CLAUDE.md` and other docs for agents.

## Credits and license

MIT, see [LICENSE](./LICENSE). Most skills are derived from [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pocock (MIT). All third-party notices are in [THIRD_PARTY_LICENSES.md](./THIRD_PARTY_LICENSES.md).
