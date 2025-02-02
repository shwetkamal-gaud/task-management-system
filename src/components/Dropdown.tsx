import React, { useState } from "react"
import { DateRange, DateRangePicker, RangeKeyDict } from 'react-date-range'
interface Props {
    isIcon?: boolean;
    btnBolor: string;
    direction: string;
    items?: string[];
    setSelected?: (value: string) => void;
    selected?: string;
    isDate?: boolean;
    startDate?: Date;
    endDate?: Date;
    handleDateChange?: (value: RangeKeyDict) => void
}

const Dropdown: React.FC<Props> = ({ isIcon, selected, btnBolor, direction, items, setSelected, isDate, startDate, endDate, handleDateChange }) => {
    const [isClick, setIsClick] = useState(false)

    return (
        <div className="flex flex-col">
            <button data-dropdown-trigger="click" id="dropdownDefaultButton" style={{ backgroundColor: btnBolor }} data-dropdown-toggle={direction} onClick={() => setIsClick((prev) => !prev)} className="text-black border  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  p-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                {isDate ? endDate && startDate ? `${startDate?.toDateString()}-${endDate?.toDateString()}`:'DueDate' : selected && selected?.length > 0 ? selected : 'Category'}
                {isIcon && <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>}
            </button>

            {isClick && isIcon && <div id={direction} className={"z-10  bg-pink-100 divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"}>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {items?.map((item) => (
                        <li onClick={() => { setSelected && setSelected(item); setIsClick(false) }}>
                            <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{item}</a>
                        </li>
                    ))}
                </ul>
            </div>}
            {isClick && isDate && <DateRange
                ranges={[{ startDate: startDate, endDate: endDate, key: 'selection' }]}
                onChange={handleDateChange}
                moveRangeOnFirstSelection={false}
                months={1}
                direction="horizontal"
            />}
        </div>
    )
}

export default Dropdown