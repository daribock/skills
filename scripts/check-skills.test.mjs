import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { checkRepo } from "./check-skills.mjs";

const skillMd = (name, description = "Does a thing.") =>
  `---\nname: ${name}\ndescription: ${description}\n---\n\n# ${name}\n`;

function makeRepo({
  skills = { "engineering/tdd": skillMd("tdd") },
  pluginSkills = ["./skills/engineering/tdd"],
  readme = "- [tdd](./skills/engineering/tdd/SKILL.md)",
} = {}) {
  const root = mkdtempSync(join(tmpdir(), "check-skills-"));
  for (const [path, skillMd] of Object.entries(skills)) {
    mkdirSync(join(root, "skills", path), { recursive: true });
    if (skillMd !== null) writeFileSync(join(root, "skills", path, "SKILL.md"), skillMd);
  }
  mkdirSync(join(root, ".claude-plugin"));
  writeFileSync(
    join(root, ".claude-plugin", "plugin.json"),
    JSON.stringify({ name: "x", skills: pluginSkills }),
  );
  writeFileSync(join(root, "README.md"), readme);
  return root;
}

test("a consistent repo has no errors", () => {
  const root = makeRepo();
  assert.deepEqual(checkRepo(root), []);
});

test("reports a skill folder without SKILL.md", () => {
  const root = makeRepo({
    skills: { "engineering/tdd": null },
  });
  assert.match(checkRepo(root).join("\n"), /engineering\/tdd: missing SKILL.md/);
});

test("reports a name that does not match the folder", () => {
  const root = makeRepo({
    skills: { "engineering/tdd": skillMd("tdd-2") },
  });
  assert.match(checkRepo(root).join("\n"), /engineering\/tdd: name "tdd-2" does not match folder/);
});

test("reports a missing description", () => {
  const root = makeRepo({
    skills: { "engineering/tdd": "---\nname: tdd\n---\n" },
  });
  assert.match(checkRepo(root).join("\n"), /engineering\/tdd: missing description/);
});

test("reports skills missing from or extra in plugin.json", () => {
  const root = makeRepo({
    pluginSkills: ["./skills/engineering/gone"],
  });
  const errors = checkRepo(root).join("\n");
  assert.match(errors, /engineering\/tdd: not listed in plugin.json/);
  assert.match(errors, /plugin.json lists \.\/skills\/engineering\/gone, which does not exist/);
});

test("reports skills not linked from the README", () => {
  const root = makeRepo({
    readme: "nothing here",
  });
  assert.match(checkRepo(root).join("\n"), /engineering\/tdd: not linked from README.md/);
});
