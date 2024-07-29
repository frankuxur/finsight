const time = (time) => {
  const dt = new Date(time)
  const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"]
  const year = dt.getFullYear()
  const day = dt.getDate()
  const formattedDay = day.toString().length === 1 ? day.toString().padStart(2, '0') : day
  const formattedMonth = (month[dt.getMonth()])
  const formattedYear = new Date(Date.now()).getFullYear() === year ? '' : `, ${year}`
  const formattedDate = `${formattedMonth} ${formattedDay}${formattedYear}`

  return formattedDate
}

export default time