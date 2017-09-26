'use strict';

var React = require('react'),
	createClass = require('create-react-class'),
	DaysView = require('./DaysView'),
	WeeksView = require('./WeeksView'),
	MonthsView = require('./MonthsView'),
	QuartersView = require('./QuartersView'),
	YearsView = require('./YearsView'),
	TimeView = require('./TimeView')
	;

var CalendarContainer = createClass({
	viewComponents: {
		days: DaysView,
		weeks: WeeksView,
		months: MonthsView,
		quarters: QuartersView,
		years: YearsView,
		time: TimeView
	},

	render: function() {
		return React.createElement( this.viewComponents[ this.props.view ], this.props.viewProps );
	}
});

module.exports = CalendarContainer;
