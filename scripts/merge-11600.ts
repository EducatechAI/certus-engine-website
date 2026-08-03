import fs from 'fs';
import path from 'path';

const currentSeedsFile = path.join(process.cwd(), 'src', 'data', 'seeds.json');
const base11600File = path.join(process.cwd(), 'src', 'data', 'seeds_backup_2026-08-02T02-40-29-560Z.json');

// Read the perfectly fixed 4680 DB which contains the 222 good articles
const currentSeeds = JSON.parse(fs.readFileSync(currentSeedsFile, 'utf8'));

// Get the 222 perfectly fixed articles
const good222 = currentSeeds.filter((s: any) => s.contentMarkdown);
console.log(`Found ${good222.length} perfectly fixed articles in current seeds.json (Total ${currentSeeds.length})`);

// Read the 11600 DB base
const base11600 = JSON.parse(fs.readFileSync(base11600File, 'utf8'));
console.log(`Loaded ${base11600.length} items from 11600 base.`);

let mergedCount = 0;
let preservedCount = 0;
let quarantineCount = 0;

// Wipe all contentMarkdown from the 11600 DB, then inject the 222 good ones.
for (let i = 0; i < base11600.length; i++) {
  const item = base11600[i];
  
  // Find if this item is one of the 222 good ones
  const goodMatch = good222.find((g: any) => g.slug === item.slug);
  
  if (goodMatch) {
    // Replace with the perfectly fixed version
    base11600[i] = goodMatch;
    preservedCount++;
  } else {
    // Quarantine it (wipe contentMarkdown)
    if (item.contentMarkdown) {
      delete item.contentMarkdown;
    }
    quarantineCount++;
  }
}

// Check if any of the 222 good ones were NOT in the 11600 DB (should be zero, but just in case)
const base11600Slugs = new Set(base11600.map((s: any) => s.slug));
for (const good of good222) {
  if (!base11600Slugs.has(good.slug)) {
    console.log(`WARNING: Good article ${good.slug} was not in the 11600 DB. Appending it.`);
    base11600.push(good);
    preservedCount++;
  }
}

console.log(`\nMerge Summary:`);
console.log(`Total items in new DB: ${base11600.length}`);
console.log(`Vivos (from good 222): ${preservedCount}`);
console.log(`Quarantined: ${quarantineCount}`);

// Backup current just in case
const backupPath = currentSeedsFile.replace('.json', `_backup_merge_to_11600_${Date.now()}.json`);
fs.renameSync(currentSeedsFile, backupPath);
console.log(`Backed up current to ${backupPath}`);

// Write the new 11600 DB
fs.writeFileSync(currentSeedsFile, JSON.stringify(base11600, null, 2));
console.log(`Wrote new seeds.json with ${base11600.length} items!`);

