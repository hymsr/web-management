import moment from 'moment';

const defaultFomatter = 'YYYY-MM-DD HH:mm:ss';

export const formatTime = (time: any, formatter: string = defaultFomatter): string => moment(time).format(formatter);

export const sleep = (duration: number) => new Promise(resolve => setTimeout(resolve, duration));
