import * as React from 'react';
import { DatesForm, IDatesRange, NeoMap } from '..';
import { NasaApiService } from '../../services';

export interface IAppContentState {
	neos: any[];
}

export class AppContent extends React.Component<{}, IAppContentState> {
	private initialDates = {
		start: '2018-07-10',
		end: '2018-07-11',
	};

	constructor(props: any) {
		super(props);
		this.state = {
			neos: [],
		}
	}

	componentDidMount() {
		this.getNeosData(this.initialDates.start, this.initialDates.end);
	}

	private onDatesSelected = (datesRange: IDatesRange) => {
		return this.getNeosData(datesRange.start, datesRange.end);
	};

	private getNeosData = (startDate: string, endDate: string) => {
		NasaApiService.getNeosData(startDate, endDate).then((data) => {
			const neos: any[] = [];
			Object.keys(data).forEach((key) => {
				neos.push(...data[key]);
			});
			this.setState({
				neos
			});
		});
	};

	render() {
		return (
			<div>
				<DatesForm onDatesSelected={this.onDatesSelected} maxDaysRange={7}/>
				<NeoMap neos={this.state.neos}/>
			</div>
		)
	}
}
