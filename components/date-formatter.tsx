import { parseISO, format } from 'date-fns'

type Props = {
  dateString: string
}

const DateFormatter = ({ dateString }: Props) => {
  const date = parseISO("2021-05-28T18:07:44.478Z")
  return <time
    dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}

export default DateFormatter
