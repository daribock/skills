#!/usr/bin/env node
// Checks that every skill folder is well-formed and registered in plugin.json and README.md.
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function listSkillDirs(root) {
  const skillsDir = join(root, "skills");
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter((bucket) => bucket.isDirectory())
    .flatMap((bucket) =>
      readdirSync(join(skillsDir, bucket.name), { withFileTypes: true })
        .filter((skill) => skill.isDirectory())
        .map((skill) => `${bucket.name}/${skill.name}`),
    )
    .sort();
}

function readFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([\w-]+):\s*(.*)$/);
    if (field) fields[field[1]] = field[2].replace(/^["']|["']$/g, "").trim();
  }
  return fields;
}

export function checkRepo(root) {
  const errors = [];
  const skills = listSkillDirs(root);
  const plugin = JSON.parse(readFileSync(join(root, ".claude-plugin", "plugin.json"), "utf8"));
  const pluginSkills = new Set(plugin.skills ?? []);
  const readme = readFileSync(join(root, "README.md"), "utf8");

  for (const skill of skills) {
    const folderName = skill.split("/")[1];
    const skillMdPath = join(root, "skills", skill, "SKILL.md");
    if (!existsSync(skillMdPath)) {
      errors.push(`${skill}: missing SKILL.md`);
    } else {
      const frontmatter = readFrontmatter(readFileSync(skillMdPath, "utf8"));
      if (!frontmatter) {
        errors.push(`${skill}: missing frontmatter`);
      } else {
        if (frontmatter.name !== folderName) {
          errors.push(`${skill}: name "${frontmatter.name}" does not match folder`);
        }
        if (!frontmatter.description) errors.push(`${skill}: missing description`);
      }
    }
    if (!pluginSkills.has(`./skills/${skill}`)) errors.push(`${skill}: not listed in plugin.json`);
    if (!readme.includes(`skills/${skill}/SKILL.md`)) errors.push(`${skill}: not linked from README.md`);
  }

  for (const listed of pluginSkills) {
    if (!skills.includes(listed.replace(/^\.\/skills\//, ""))) {
      errors.push(`plugin.json lists ${listed}, which does not exist`);
    }
  }
  return errors;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const root = resolve(fileURLToPath(import.meta.url), "../..");
  const errors = checkRepo(root);
  for (const error of errors) console.error(`✗ ${error}`);
  if (errors.length) process.exit(1);
  console.log("✓ all skills are consistent");
}
