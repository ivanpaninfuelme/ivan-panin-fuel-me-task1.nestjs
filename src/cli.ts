import 'reflect-metadata';
import { ReportGenerator } from './report/report-generator';
import { createLogger } from './utils/logger.util';

async function main(){
    const cliLogger = createLogger('CLI');
    cliLogger("Start CLI...");
    
    // ulaz od 1 do 10
    const args = process.argv.slice(2);
    const input = Number(args[0]);
    if (isNaN(input) || input < 1 || input > 10) {
        console.error("Please provide a number between 1 and 10 as the first argument.");
        process.exit(1);
    }
    // generate
    const generator = new ReportGenerator();
    try {
        const report = await generator.generateReport(input);
        console.log(JSON.stringify(report, null, 2)); 
      } catch (error) {
        console.error("Error generating report:", (error as Error).message);
      }
}

main();