export type CalendarViewType = 'week' | 'month';

export type TypeSwitcherItem<T extends string> = {
	id: number;
	title: string;
	value: T;
};

export type MeridiemType = 'PM' | 'AM';
