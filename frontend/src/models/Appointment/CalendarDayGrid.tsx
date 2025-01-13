import React from 'react';
import dayjs from 'dayjs';


interface CalendarCentralWidgetProps {
    day : dayjs.Dayjs,
    rowIndex : number
  }
  
  const CalendarDayGrid: React.FC<CalendarCentralWidgetProps> = ( {day, rowIndex}) => {

    function getCurrentDayClass(){
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "bg-sky-400 text-white rounded-full w-7" : ""
    }
  
    return (
      <div className='border border-gray-200 flex flex-col'>
        <header className='flex flex-col items-center'>
            { rowIndex == 0 && 
            <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
            }
            
            <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
            {day.format('DD')}
            </p>
        </header>
      </div>
    );
  };
  

export default CalendarDayGrid;