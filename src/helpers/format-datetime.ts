import moment from 'moment';

export function formatRelativeDateTime(datetime: string): string {
  return moment(datetime).fromNow();
}
