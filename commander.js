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

  // Read input file synchronously
  if (opt.input) {
    try {
      const data = fs.readFileSync(opt.input, 'utf8');
      
      let res = [];
      let buf = JSON.parse(data);
      
      for (let i = 0; i < buf.length; i++) {
        if (buf[i]["value"] > 5) {
          res.push(buf[i]);
        }
      }

      g_data = JSON.stringify(res, null, 2);  
    } catch (err) {
      console.error("Error reading input file:", err);
      process.exit(1);  
    }
  }

  // Write to output file if specified
  if (opt.output) {
    try {
      fs.writeFileSync(opt.output, g_data);
      console.log(`Data successfully written to ${opt.output}`);
    } catch (err) {
      console.error("Error writing to output file:", err);
      process.exit(1);  
    }
  }

  // Display result in console if the `-d` flag is provided
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
