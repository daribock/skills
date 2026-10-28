Skills live in bucket folders under `skills/`:

- `engineering/`: daily code work
- `productivity/`: daily non-code workflow tools

Every skill must have an entry in `.claude-plugin/plugin.json`'s `skills` array and a link to its `SKILL.md` in the top-level `README.md`, grouped under **User-invoked** or **Model-invoked**. A skill's `name` frontmatter must match its folder name. User-invoked skills set `disable-model-invocation: true`.

When you add, rename or remove a skill, sweep every `SKILL.md` and its supporting files for references to it, so no skill points at one that doesn't exist.

Run `node scripts/check-skills.mjs` after touching skills, and `claude plugin validate . --strict` after touching either manifest. CI runs both.

## Third-party skills

A skill from someone else enters this repo only if its license allows modification and redistribution (MIT, Apache-2.0, BSD and similar). Record the source, version and full license text in `THIRD_PARTY_LICENSES.md`, and end the derived `SKILL.md` with a `<!-- Based on ... -->` credit line. If a skill has no license or an incompatible one, ask the author or rewrite it from scratch, taking only the idea.

## Commits and releases

Use Conventional Commits with the skill name as the scope: `feat(tdd): ...`, `fix(triage): ...`, `docs(readme): ...`. Breaking changes to a skill's flow use `feat!:`. release-please derives the version and `CHANGELOG.md` from these commits, so never edit the version in `plugin.json` or `CHANGELOG.md` by hand.
