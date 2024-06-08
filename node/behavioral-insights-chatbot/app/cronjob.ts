import cron, { ScheduleOptions } from 'node-cron';

export class CronJobs {
  options: ScheduleOptions;
  constructor() {
    this.options = {
      scheduled: true,
      timezone: process.env.CRONJOB_TIMEZONE,
    };
  }
  setCronJobs() {}
}
