// components/CustomDayPicker.tsx
import { useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CustomDayPickerProps {
    index: number;
    datesPerPortion: number[][];
    setDatesPerPortion: React.Dispatch<React.SetStateAction<number[][]>>;
}

const CustomDayPicker: React.FC<CustomDayPickerProps> = ({
    index,
    datesPerPortion,
    setDatesPerPortion,
}) => {
    const handleDayClick = (date: Date) => {
        const newDate = date.getTime();
        setDatesPerPortion((prevState) => {
            const updatedPortion = [...prevState];
            const currentDates = updatedPortion[index];

            if (currentDates.includes(newDate)) {
                updatedPortion[index] = currentDates.filter(
                    (d) => d !== newDate
                );
            } else {
                updatedPortion[index] = [...currentDates, newDate];
            }

            return updatedPortion;
        });
    };

    const selectedDates = datesPerPortion[index].map(
        (timestamp) => new Date(timestamp)
    );

    const excludeDates = datesPerPortion[index].map(
        (timestamp) => new Date(timestamp)
    );

    return (
        <DayPicker
            selected={selectedDates}
            onDayClick={handleDayClick}
            numberOfMonths={2}
            disabled={excludeDates}
        />
    );
};

export default CustomDayPicker;
