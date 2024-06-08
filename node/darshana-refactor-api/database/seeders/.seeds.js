console.log("Initializing seeders")

const cliProgress = require('cli-progress');

const args = process.argv.slice(2);

async function execute() {
  const configPath = require('path').join(process.cwd(), args[0]);
  const config = require(configPath);

  const tables = await Promise.resolve(config.tables())

  console.log(`Seeding table${tables.length !== 0 ? 's' : ''}: \n`);

  let count = 0;
  for (const {table, data} of tables) {
    const bar = new cliProgress.SingleBar({
      format: `${table.padEnd(12)}\t{bar} || {percentage}% || {value}/{total}`,
      barCompleteChar: '\u2588',
      barIncompleteChar: '\u2591'
    }, cliProgress.Presets.shades_grey);
    bar.start(data.length, 0);

    if(Array.isArray(data)) {
      for (const obj of data) {
        await Promise.resolve(config.process({table, data: obj}));
        count++;
        bar.increment();
      }
    } else {
      await Promise.resolve(config.process({table, data}));
      count++;
      bar.increment();
    }

    bar.stop();
  }
  return count;
}

execute()
    .then((inserted) => console.log(`\n\nDatabase Seeded with ${inserted} rows\n\n`))
    .catch((err) => console.log("\n\nDatabase Couldnt be seeded, because...\n\n", err, "\n"))
    .finally(() => process.exit());
