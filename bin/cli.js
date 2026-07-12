#!/usr/bin/env node
'use strict';

// Windows: switch to UTF-8 so Thai text renders correctly in cmd/PowerShell
if (process.platform === 'win32') {
  try { require('child_process').execSync('chcp 65001', { stdio: 'ignore' }); } catch (e) {}
}

const fs   = require('fs');
const path = require('path');

const TEMPLATE_DIR = path.join(__dirname, '..', 'template');
const VERSION      = require('../package.json').version;

// ── helpers ──────────────────────────────────────────────────────────────────

function printHelp() {
  console.log(`
builder-codex v${VERSION}
Solo-survival + behavioral guardrails standards bundle for AI-assisted dev

Usage:
  npx builder-codex init [path]   Install bundle into <path> (default: current dir)
  npx builder-codex list          List files that would be installed
  npx builder-codex version       Show version
  npx builder-codex help          Show this help

Examples:
  npx builder-codex init                # install into current project
  npx builder-codex init ./my-project  # install into specific folder
`);
}

function copyRecursive(src, dest, overwriteLog) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry), overwriteLog);
    }
  } else {
    const exists = fs.existsSync(dest);
    if (exists) overwriteLog.push(path.relative(process.cwd(), dest));
    fs.copyFileSync(src, dest);
  }
}

function listTemplate(dir, base) {
  const results = [];
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    const rel  = base ? `${base}/${entry}` : entry;
    if (fs.statSync(full).isDirectory()) {
      results.push(...listTemplate(full, rel));
    } else {
      results.push(rel);
    }
  }
  return results;
}

// ── commands ─────────────────────────────────────────────────────────────────

function cmdInit(target) {
  const dest = path.resolve(process.cwd(), target || '.');
  if (!fs.existsSync(dest)) {
    console.error(`Error: path not found — ${dest}`);
    process.exit(1);
  }

  const overwritten = [];
  copyRecursive(TEMPLATE_DIR, dest, overwritten);

  console.log(`\n✅ Builder Codex v${VERSION} installed into ${dest}`);
  console.log('');
  console.log('Files installed:');
  for (const f of listTemplate(TEMPLATE_DIR, '')) {
    const marker = overwritten.includes(f) ? ' (overwritten)' : '';
    console.log(`  ${f}${marker}`);
  }

  console.log('');
  console.log('Next steps:');
  console.log('  1. Open AGENTS.md → replace [Project Name], [Stack], [Commands]');
  console.log('  2. Open spec.md   → fill in project goal + current state');
  console.log('  3. git add . && git commit -m "chore: install Builder Codex v' + VERSION + '"');
  console.log('  4. Your AI agent (Claude Code, Cursor, Codex CLI, Windsurf…)');
  console.log('     will auto-read AGENTS.md on every session');
  console.log('');
  console.log('Before every deploy:');
  console.log('  npx pdpa-guard .    ← PDPA compliance scan (P-28)');
}

function cmdList() {
  console.log(`\nBuilder Codex v${VERSION} — files to be installed:\n`);
  for (const f of listTemplate(TEMPLATE_DIR, '')) {
    console.log(`  ${f}`);
  }
  console.log('');
}

// ── main ─────────────────────────────────────────────────────────────────────

const [,, cmd, ...args] = process.argv;

switch (cmd) {
  case 'init':    cmdInit(args[0]); break;
  case 'list':    cmdList();        break;
  case 'version': console.log(`builder-codex v${VERSION}`); break;
  case 'help':
  case '--help':
  case '-h':
  case undefined: printHelp();      break;
  default:
    console.error(`Unknown command: ${cmd}`);
    printHelp();
    process.exit(1);
}
