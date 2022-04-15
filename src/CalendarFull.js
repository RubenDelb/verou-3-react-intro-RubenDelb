import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { nlBE } from 'date-fns/locale'
import { useEffect, useState } from 'react'
import Header from './Header'
import DatePicker from "react-datepicker"
import Button from './Button'
import "react-datepicker/dist/react-datepicker.css"

const locales = {
	'nl-BE': nlBE,
}

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
})


const CalendarFull = () => {
	const [newEvent, setNewEvent] = useState({ title: "", start: new Date(), end: "", complete: false })
	const [allEvents, setAllEvents] = useState([])

	useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("allEvents")) // *2
    if (storedEvents) setAllEvents(storedEvents) // *3
  }, []) // *1

  // Every time the todo's are modified(*1), it saves the new array of todos as a string in localstorage(*2)
  useEffect(() => {
    localStorage.setItem("allEvents", JSON.stringify(allEvents)) //*2
  }, [allEvents]) // *1

	// const [startDate, setStartDate] = useState(new Date());
	// const [endDate, setEndDate] = useState(null);
	const onChange = (dates) => {
		const [start, end] = dates;
		setNewEvent({title: newEvent.title, start , end});
	};

	const handleAddEvent = () => {
		setAllEvents([...allEvents, newEvent])
	}

	const filterPassedTime = (time) => {
		const currentDate = new Date();
		const selectedDate = new Date(time);

		return currentDate.getTime() < selectedDate.getTime();
	};

	return (
		<div>
			<Header headerTitle={"Calendar"} />
			<div>
				<input className="border-2 p-1 m-1 rounded" 
					type="text" 
					placeholder="Add Title" 
					value={newEvent.title} 
					onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
				<DatePicker className="border-2 p-1 m-1 rounded"   
					placeholderText="Start Date" 
					selected={newEvent.start} 
					onChange={(start) => setNewEvent({...newEvent, start})}
					withPortal
					showTimeSelect
					filterTime={filterPassedTime}
					dateFormat="d MMMM yyyy, h:mm aa" />
				<DatePicker className="border-2 p-1 m-1 rounded" 
					placeholderText="End Date" 
					selected={newEvent.end} 
					onChange={(end) => setNewEvent({...newEvent, end})} 
					withPortal
					showTimeSelect
					filterTime={filterPassedTime}
					dateFormat="d MMMM yyyy, h:mm aa" />
				<Button className="mb-4" btnFunction={handleAddEvent} btnName={"Add Event"} />
			</div>
			<div className="mt-4">
				<Calendar
					localizer={localizer}
					events={allEvents}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }} />
			</div>
		</div>
	)
}

export default CalendarFull