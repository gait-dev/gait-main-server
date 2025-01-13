import React from 'react';
import dayjs from 'dayjs';


interface CalendarCentralWidgetProps {
    day : dayjs.Dayjs,
    rowIndex : number
  }
  
  const CalendarDayGrid: React.FC<CalendarCentralWidgetProps> = ( {day, rowIndex}) => {

  
    return (
      <div className='border border-gray-200 flex flex-col'>
        <header className='flex flex-col items-center'>
            { rowIndex == 0 && 
            <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>
            }
            
            <p className='text-sm p-1 my-1 text-center'>
            {day.format('DD')}
            </p>
        </header>
      </div>
    );
  };
  

export default CalendarDayGrid;