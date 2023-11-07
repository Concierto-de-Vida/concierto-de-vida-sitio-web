import { JSX } from "preact";
import { MdToday } from "react-icons/md";
import GetInput from "../components/GetInput.tsx";
import { Signal, useSignal } from "@preact/signals";
import DateSelect from "../components/DateSelect.tsx";
import MonthSelect from "../components/MonthSelect.tsx";
import { getButtonClasses } from "../components/Button.tsx";
import Autocomplete from "../types/Autocomplete.tsx";

export type DateElements = "date" | "month" | "year" | "hours" | "minutes" | "seconds";

export type AutocompleteRecord = Partial<Record<DateElements, Autocomplete>>;
export function isAutocompleteRecord(autocomplete: unknown): autocomplete is AutocompleteRecord {
  return typeof autocomplete === "object";
}

interface EditableObjectDateInputProps {
  id: string;
  onlyDate?: boolean;
  defaultValue?: JSX.HTMLAttributes["defaultValue"];
  autocomplete?: Partial<Record<DateElements, Autocomplete>>;
}

export default function GetDateInput({ defaultValue, id, onlyDate, autocomplete }: EditableObjectDateInputProps) {
  const dateObj = new Date(!defaultValue ? Date.now() : +defaultValue);

  const s: Record<DateElements, Signal<number>> = {
    date: useSignal(dateObj.getDate()),
    month: useSignal(dateObj.getMonth()),
    year: useSignal(dateObj.getFullYear()),
    hours: useSignal(onlyDate ? 0 : dateObj.getHours()),
    minutes: useSignal(onlyDate ? 0 : dateObj.getMinutes()),
    seconds: useSignal(onlyDate ? 0 : dateObj.getSeconds()),
  };

  const dateElements: [DateElements, number][] = [
    ["date", s.date.value],
    ["month", s.month.value],
    ["year", s.year.value],
  ];
  if (!onlyDate) {
    dateElements.push(["hours", s.hours.value]);
    dateElements.push(["minutes", s.minutes.value]);
    dateElements.push(["seconds", s.seconds.value]);
  }

  const timezoneOffset = new Date().getTimezoneOffset() * -1;

  function handleDateToday() {
    s.year.value = 0;
    const dateObj = new Date();
    s.date.value = dateObj.getDate();
    s.month.value = dateObj.getMonth();
    s.year.value = dateObj.getFullYear();
    s.hours.value = dateObj.getHours();
    s.minutes.value = dateObj.getMinutes();
    s.seconds.value = dateObj.getSeconds();
  }

  const handleDataChange = (key: DateElements) => (e: JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement>) =>
    void (s[key].value = +e.currentTarget.value);

  const selectorsAndInputs: JSX.Element[] = dateElements!.map(([key, value]) => {
    switch (key) {
      case "month":
        return (
          <MonthSelect
            key={key}
            month={value}
            id={`${id}&${key}`}
            onChange={handleDataChange(key)}
            autoComplete={autocomplete?.month}
            class="px-2 w-full bg-gray-200 rounded"
          />
        );

      case "date":
        return (
          <DateSelect
            key={key}
            date={s.date.value}
            year={s.year.value}
            id={`${id}&${key}`}
            month={s.month.value}
            onChange={handleDataChange(key)}
            autoComplete={autocomplete?.date}
            class="px-2 w-full bg-gray-200 rounded"
          />
        );

      case "year":
      case "hours":
      case "minutes":
      case "seconds":
        return (
          <GetInput
            min={1}
            step="1"
            key={key}
            type="number"
            value={value}
            placeholder={key}
            id={`${id}&${key}`}
            class="bg-gray-200 rounded"
            onChange={handleDataChange(key)}
            autoComplete={autocomplete?.[key]}
            max={key === "year" ? new Date().getFullYear() : 60}
          />
        );
    }
  });

  return (
    <>
      {selectorsAndInputs}

      <input type="hidden" name="offset" value={timezoneOffset} />

      {/* Today button */}
      <div
        title="Hoy"
        onClick={handleDateToday}
        class={`${getButtonClasses("blue", false)} px-2 hidden md:flex items-center cursor-pointer h-[26px]`}
      >
        <MdToday size={13} />
      </div>
    </>
  );
}
