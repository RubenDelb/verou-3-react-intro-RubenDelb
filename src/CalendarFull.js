import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { nlBE } from 'date-fns/locale'
import Header from './Header'
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

const CalendarFull = ({ todos }) => {
	const allTodos = todos.map(todo => {
    return { id: todo.id, title: todo.title, complete: todo.complete, start: new Date(todo.start), end: new Date(todo.end)}
  })

	return (
		<div>
			<Header headerTitle={"Calendar"} />
			{/* <div>
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
			</div> */}
			<div className="mt-4">
				<Calendar
					localizer={localizer}
					events={allTodos}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }} />
			</div>
		</div>
	)
}

export default CalendarFull