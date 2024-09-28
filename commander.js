const fs = require('fs');
const { program } = require('commander');


program.requiredOption('-i, --input <file>', 'Input file');
program.option('-o, --output <file>', 'Output file');
program.option('-d, --display', 'Display results on the console');


program.exitOverride();

try {
  program.parse(process.argv);  
  let opt = program.opts();     

  let g_data;

  if (opt.input) {
    try {
      g_data = fs.readFileSync(opt.input, 'utf8');  
    } catch (err) {
      console.error("Cannot find input file.");
      process.exit(1);  
    }
  }


  if (opt.output) {
    try {
      fs.writeFileSync(opt.output, g_data);  
      console.log(`Data successfully written to ${opt.output}`);
    } catch (err) {
      console.error("Cannot find output file");
      process.exit(1);  
    }
  }


  if (opt.display) {
    console.log(g_data);
  }

} catch (err) {

  if (err.code === 'commander.optionMissingArgument') {
    console.error('Error: Please, specify input file.');
  } else if (err.code === 'commander.missingRequiredOption') {
    console.error('Error: Missing required option.');
  }
  process.exit(1);  
}
