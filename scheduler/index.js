const schedule = require('node-schedule');
const schedules = [];
const logger = require('winston');

const rule = new schedule.RecurrenceRule();
// rule.dayOfWeek = 5;
// rule.hour = 16;
// rule.minute = 1;
//rule.minute = new schedule.Range(1, 59);
//rule.dayOfWeek = [0, new schedule.Range(4, 6)];	
rule_first = 10;
rule_first = 0;

// schedules.push(schedule.scheduleJob(rule, fun.bind(null, err => {
// 	if (err) {
// 		logger.error(`Error scheduler  first_email ${err}`)
// 	} else {
// 		logger.info(`Done scheduler first_email ${new Date()}`);
// 	}
// })));


module.exports = schedules;