const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (question) => new Promise((resolve) => rl.question(question, resolve));

async function main() {
  console.log('\x1b[32m%s\x1b[0m', '--- Sentinel Writeup Generator ---');
  
  const title = await ask('Writeup Title: ');
  const date = new Date().toISOString().split('T')[0];
  const machine = await ask('Machine Name: ');
  const difficulty = await ask('Difficulty (Easy/Medium/Hard/Insane): ');
  const category = await ask('Category (Web/Pwn/Reverse/Crypto/Forensics/Misc): ');
  const tags = await ask('Tags (comma separated): ');
  
  const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
  const fileName = `${slug}.mdx`;
  const filePath = path.join(process.cwd(), 'content', fileName);

  const template = `---
title: "${title}"
date: "${date}"
machine: "${machine}"
difficulty: "${difficulty}"
category: "${category}"
tags: [${tags.split(',').map(t => `"${t.trim()}"`).join(', ')}]
summary: "Brief overview of the ${machine} machine exploitation."
---

# ${title}

## Initial Reconnaissance

<CyberInfo type="exploit" title="Key Exploit">
  Describe the primary vulnerability discovered during recon or initial access.
</CyberInfo>

## Enumeration

- **Nmap Scan:**
- **Web Discovery:**

## Exploitation

### Step 1: Initial Access

### Step 2: Privilege Escalation

<CyberInfo type="lesson" title="Lesson Learned">
  What was the key takeaway from this machine?
</CyberInfo>

## Conclusion

The ${machine} machine provided a great challenge in...
`;

  if (!fs.existsSync(path.join(process.cwd(), 'content'))) {
    fs.mkdirSync(path.join(process.cwd(), 'content'), { recursive: true });
  }

  fs.writeFileSync(filePath, template);
  console.log('\x1b[32m%s\x1b[0m', `\n[+] Success! Writeup generated at: content/${fileName}`);
  rl.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
