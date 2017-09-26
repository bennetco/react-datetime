'use strict';

var React = require('react'),
	createClass = require('create-react-class'),
	onClickOutside = require('react-onclickoutside')
	;

var DateTimePickerQuarters = onClickOutside( createClass({
	render: function() {
		return React.createElement('div', { className: 'rdtQuarters' }, [
			React.createElement('table', { key: 'a' }, React.createElement('thead', {}, React.createElement('tr', {}, [
				React.createElement('th', { key: 'prev', className: 'rdtPrev', onClick: this.props.subtractTime( 1, 'years' )}, React.createElement('span', {}, '‹' )),
				React.createElement('th', { key: 'year', className: 'rdtSwitch', onClick: this.props.showView( 'years' ), colSpan: 2, 'data-value': this.props.viewDate.year() }, this.props.viewDate.year() ),
				React.createElement('th', { key: 'next', className: 'rdtNext', onClick: this.props.addTime( 1, 'years' )}, React.createElement('span', {}, '›' ))
			]))),
			React.createElement('table', { key: 'quarters' }, React.createElement('tbody', { key: 'b' }, this.renderQuarters()))
		]);
	},

	renderQuarters: function() {
		var date = this.props.selectedDate,
			quarter = this.props.viewDate.quarter(),
			year = this.props.viewDate.year(),
			rows = [],
			//moment.quarter is 1-indexed
			i = 1,
			quarters = [],
			renderer = this.props.renderQuarter || this.renderQuarter,
			isValid = this.props.isValidDate || this.alwaysValidDate,
			classes, props, currentQuarter, isDisabled, noOfDaysInQuarter, daysInQuarter, validDay,
			// Date is irrelevant because we're only interested in month
			irrelevantDate = 1
			;

		while (i <= 4) {
			classes = 'rdtQuarter';
			currentQuarter = this.props.viewDate.clone().set({ year: year, quarter: i, date: irrelevantDate });

			noOfDaysInQuarter = currentQuarter.endOf( 'quarter' ).format( 'D' );
			daysInQuarter = Array.from({ length: noOfDaysInQuarter }, function( e, i ) {
				return i + 1;
			});

			validDay = daysInQuarter.find(function( d ) {
				var day = currentQuarter.clone().set( 'date', d );
				return isValid( day );
			});

			isDisabled = ( validDay === undefined );

			if ( isDisabled )
				classes += ' rdtDisabled';

			if ( date && i === date.quarter() && year === date.year() )
				classes += ' rdtActive';

			props = {
				key: i,
				'data-value': i,
				className: classes
			};

			if ( !isDisabled )
				props.onClick = this.updateSelectedQuarter;

			quarters.push( renderer( props, i, year, date && date.clone() ) );

			rows.push( React.createElement('tr', { key: quarter + '_' + rows.length }, quarters ) );

			quarters = [];

			i++;
		}

		return rows;
	},

	updateSelectedQuarter: function( event ) {
		this.props.updateSelectedDate( event );
	},

	renderQuarter: function( props, quarter ) {
		var localMoment = this.props.viewDate;
		var strLength = 3;

		var firstMonthStr = localMoment.localeData().monthsShort(localMoment.quarter(quarter).startOf('quarter'));
		var lastMonthStr = localMoment.localeData().monthsShort(localMoment.endOf('quarter'));

		// Because some months are up to 5 characters long, we want to
		// use a fixed string length for consistency
		var quarterStr = firstMonthStr.substring( 0, strLength ) + ' - ' + lastMonthStr.substring( 0, strLength );

		return React.createElement('td', props, capitalize( quarterStr ) );
	},

	alwaysValidDate: function() {
		return 1;
	},

	handleClickOutside: function() {
		this.props.handleClickOutside();
	}
}));

function capitalize( str ) {
	return str.charAt( 0 ).toUpperCase() + str.slice( 1 );
}

module.exports = DateTimePickerQuarters;
