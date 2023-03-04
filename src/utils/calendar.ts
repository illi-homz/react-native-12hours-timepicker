export const convertTimeToUSFormat = (time: string = '12:00') => {
	const timeString12hr = new Date('1970-01-01T' + time + ':00Z').toLocaleTimeString('en-US', {
		timeZone: 'UTC',
		hour12: true,
		hour: '2-digit',
		minute: '2-digit',
	});

	const [[hours, minutes], [meridiem]] = timeString12hr.split(' ').map((el) => el.split(':'));
	const currentHours = (+hours < 10 ? '0' : '') + +hours;
	const currentMinutes = (+minutes < 10 ? '0' : '') + +minutes;

	return `${currentHours}:${currentMinutes} ${meridiem}`;
};
