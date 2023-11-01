import { JSX } from "preact";

interface DateSelectProps extends JSX.HTMLAttributes<HTMLSelectElement> {
  /** From 0 to 11 */
  month: number;
  year: number;
  /** Defaults to 1 */
  date?: number;
  id: string;
}

export default function DateSelect({ month, year, date = 1, id, ...other }: DateSelectProps) {
  const howManyDaysInMonth = new Date(year, month + 1, 0).getDate();

  const options: JSX.Element[] = [];
  for (let i = 1; i <= howManyDaysInMonth; i++) options.push(<option value={i}>{i}</option>);

  if (date > howManyDaysInMonth) date = howManyDaysInMonth;

  return (
    <select id={id} name={id} value={date} {...other}>
      {options}
    </select>
  );
}
