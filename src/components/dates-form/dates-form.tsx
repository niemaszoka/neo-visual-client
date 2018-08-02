import * as React from 'react';
import { DateInput } from '..';

export interface IDatesRange {
	start: string;
	end: string;
}

export interface IDatesFormProps {
	onDatesSelected: (datesRange: IDatesRange) => void;
	maxDaysRange: number;
}

export interface IDatesFormState {
	startDate: string;
	endDate: string;
	isOutOfRange: boolean;
}


export class DatesForm extends React.Component<IDatesFormProps, IDatesFormState> {
	constructor(props: any) {
		super(props);
		this.state = {
			startDate: '2018-07-07',
			endDate: '2018-0-08',
			isOutOfRange: false,
		};
	}

	private onDateStartSelected = (newDate: string) => {
		this.onDateSelected(newDate, 'start');
	};

	private onDateEndSelected = (newDate: string) => {
		this.onDateSelected(newDate, 'end');
	};

	private onDateSelected = (newDate: string, rangePosition: 'start' | 'end') => {
		this.setState({
			startDate: rangePosition === 'start' ? newDate : this.state.startDate,
			endDate: rangePosition === 'end' ? newDate : this.state.endDate,
			isOutOfRange: false,

		}, () => {
			if (this.isDatesRangeValid()) {
				this.props.onDatesSelected({
					start: this.state.startDate,
					end: this.state.endDate
				})
			} else {
				this.setState({
					isOutOfRange: true
				});
			}
		})
	};

	private isDatesRangeValid = (): boolean => {
		const oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		const firstDate = new Date(this.state.startDate);
		const secondDate = new Date(this.state.endDate);

		const diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
		return diffDays <= this.props.maxDaysRange;
	};

	render() {
		const outOfRangeMessage = this.state.isOutOfRange ? (
			// @TODO Put 7-days image here
			<div className='dates-form__error'>Maximum allowed range is 7 days.</div>
		) : null;

		return (
			<div className='dates-form'>
				START<DateInput onDateSelected={this.onDateStartSelected}/>
				END<DateInput onDateSelected={this.onDateEndSelected}/>
				{outOfRangeMessage}
			</div>
		)
	}
}
