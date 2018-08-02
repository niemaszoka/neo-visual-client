import * as React from 'react';
export interface IDateInputProps {
	onDateSelected: (date: string) => void;
}

export class DateInput extends React.Component<IDateInputProps, {}> {

	private onInputChange = (event: any) => {
		return this.props.onDateSelected(event.target.value);
	};

	render() {
		return (
			<input type='date' onChange={this.onInputChange}/>
		);
	}
}