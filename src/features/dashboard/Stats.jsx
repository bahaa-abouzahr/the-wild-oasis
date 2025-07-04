import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import Stat from "./Stat"
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  // 1. Num of bookings
  const numBookings = bookings.length;

  // 2. Sales
  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);
  
  // 3. Check ins
  const checkins = confirmedStays.length;

  // 4. Occupancy rate
  // num checked in nights / all available nights (num days * num cabins)
  const occupation = confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
  
  return <>
    <Stat 
      title="Bookings" 
      color="blue" 
      icon={<HiOutlineBriefcase />} 
      value={numBookings} 
    />

    <Stat 
      title="Sales" 
      color="green"
      icon={<HiOutlineBanknotes />} 
      value={formatCurrency(sales)} 
    />
    
    <Stat 
      title="Check in" 
      color="indigo" 
      icon={<HiOutlineCalendarDays />} 
      value={checkins} 
    />

    <Stat 
      title="Occupancy rate" 
      color="yellow" 
      icon={<HiOutlineChartBar />} 
      value={Math.round(occupation * 100) + "%"} 
    />

  </>
}

export default Stats
