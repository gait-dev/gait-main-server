import React, { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosConfig';
import { Appointment } from '../../utils/types';
import CalendarSidebar from './CalendarSidebar';
import CalendarCentralWidget from './CalendarCentralWidget';
import { getMonth } from '../../utils/calendar';



const Calendar: React.FC = () => {

  const [currentMonth,setCurrentMonth] = useState(getMonth())
  

  return (
    <div className='flex flex-1'>
      <CalendarSidebar/>
      <CalendarCentralWidget month={currentMonth}/>
    </div>
  );
};

export default Calendar;
