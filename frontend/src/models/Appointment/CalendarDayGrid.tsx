import React from 'react';
import dayjs from 'dayjs';


interface CalendarCentralWidgetProps {
    day : dayjs.Dayjs,
    rowIndex : number
  }
  
  const CalendarDayGrid: React.FC<CalendarCentralWidgetProps> = ( {day, rowIndex}) => {
    const currentFormatted = dayjs().format("DD-MM-YY")
    const currentMonth = dayjs().month()

    function getCurrentDaySelectionStyle(){
        let formatted = day.format("DD-MM-YY");
        return formatted === currentFormatted ? "bg-sky-400 text-white rounded-full w-7" : ""
    }
  
    function getCurrentDayGridStyle(){
        return day.month() === currentMonth ? "" : "bg-gray-200"
    }
  
    return (
      <div className={`border border-gray-200 flex flex-col ${getCurrentDayGridStyle()}`}>
        <header className='flex flex-col items-center'>
            { rowIndex == 0 && 
            <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
            }
            
            <p className={`text-sm p-1 my-1 text-center ${getCurrentDaySelectionStyle()}`}>
            {day.format('DD')}
            </p>
        </header>
      </div>
    );
  };
  

export default CalendarDayGrid;