import dayjs from 'dayjs'

export function getMonth(month = dayjs()) {
    const firstDayOfMonth = dayjs(new Date(month.year(), month.month(), 1)).day()
    let currentMonthCount = 0 - firstDayOfMonth
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null).map(() => {
            currentMonthCount++
            return dayjs(new Date(month.year(), month.month(), currentMonthCount))
        })
    })
    return daysMatrix
}