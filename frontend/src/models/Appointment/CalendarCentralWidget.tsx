import React from 'react';
import CalendarDayGrid from './CalendarDayGrid';
import dayjs from 'dayjs';


interface CalendarCentralWidgetProps {
    month: Array<Array<dayjs.Dayjs>>
  }
  
  const CalendarCentralWidget: React.FC<CalendarCentralWidgetProps> = ( {month}) => {

  
    return (
      <div className='flex-1 grid grid-cols-7 grid-rows-5'>
        {month.map((row, index) => (
            <React.Fragment key={index}>
                {row.map((day,col_index) =>(
                    <CalendarDayGrid day={day} key={col_index} rowIndex={index}/>
                ))}
            </React.Fragment >
        ))}
      </div>
    );
  };
  

export default CalendarCentralWidget;
