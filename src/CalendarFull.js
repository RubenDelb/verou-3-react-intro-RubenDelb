import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { nlBE } from 'date-fns/locale'
import { useState } from 'react'
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
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" })
    const [allEvents, setAllEvents] = useState([])

    const handleAddEvent = () => {
        setAllEvents([...allEvents, newEvent])
    }

    return (
        <div>
            <Header headerTitle={"Calendar"} />
            <div>
                <input className="border-2 p-1 m-1 rounded" type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} />
                <DatePicker className="border-2 p-1 m-1 rounded" placeholderText="Start Date" selected={newEvent.start} onChange={(start) => setNewEvent({...newEvent, start})} />
                <DatePicker className="border-2 p-1 m-1 rounded" placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({...newEvent, end})} />
                <Button btnFunction={handleAddEvent} btnName={"Add Event"} />
            </div>
            <Calendar
                localizer={localizer}
                events={allEvents}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
            />
        </div>
    )
}

export default CalendarFull