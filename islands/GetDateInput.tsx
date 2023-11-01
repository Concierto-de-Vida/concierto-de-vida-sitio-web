import { MdToday } from "react-icons/md";
import { useSignal } from "@preact/signals";
import GetInput from "../components/GetInput.tsx";
import MonthSelect from "../components/MonthSelect.tsx";
import Button, { getButtonClasses } from "../components/Button.tsx";

export type DateElements = "date" | "month" | "year" | "hours" | "minutes" | "seconds";

interface EditableObjectDateInputProps {
  id: string;
  value?: string | number;
  onlyDate?: boolean;
}

export default function GetDateInput({ value, id, onlyDate }: EditableObjectDateInputProps) {
  const dateObj = new Date(value === undefined ? Date.now() : +value);

  const day = useSignal(dateObj.getDate());
  const month = useSignal(dateObj.getMonth());
  const year = useSignal(dateObj.getFullYear());
  const hours = useSignal(onlyDate ? 0 : dateObj.getHours());
  const minutes = useSignal(onlyDate ? 0 : dateObj.getMinutes());
  const seconds = useSignal(onlyDate ? 0 : dateObj.getSeconds());

  const dateElements: [DateElements, number][] = [
    ["date", day.value],
    ["month", month.value],
    ["year", year.value],
  ];
  if (!onlyDate) {
    dateElements.push(["hours", hours.value]);
    dateElements.push(["minutes", minutes.value]);
    dateElements.push(["seconds", seconds.value]);
  }

  const timezoneOffset = new Date().getTimezoneOffset() * -1;

  function handleDateToday() {
    const date = new Date();
    day.value = date.getDate();
    month.value = date.getMonth();
    year.value = date.getFullYear();
    hours.value = date.getHours();
    minutes.value = date.getMinutes();
    seconds.value = date.getSeconds();
  }

  return (
    <>
      {dateElements!.map(([key, value]) =>
        key === "month" ? (
          <MonthSelect key={key} month={value} id={`${id}&${key}`} class="px-2 w-full bg-gray-300 rounded" />
        ) : (
          <GetInput
            min={1}
            step="1"
            key={key}
            type="number"
            value={value}
            placeholder={key}
            id={`${id}&${key}`}
            class="bg-gray-300 rounded"
            max={key === "date" ? 31 : key === "year" ? new Date().getFullYear() : 60}
          />
        )
      )}
      <input type="hidden" name="offset" id="offset&" value={timezoneOffset} />

      {/* Today button */}
      <div
        title="Hoy"
        class={getButtonClasses("blue", false) + " px-2 flex items-center cursor-pointer h-[26px]"}
        onClick={handleDateToday}
      >
        <MdToday size={13} />
      </div>
    </>
  );
}
