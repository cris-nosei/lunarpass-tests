export function formatDate(dateStr: string): string {
    const months = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."]

    const [year, month, day] = dateStr.split('-').map(Number)

    if (!year || !month || !day) {
        throw new Error(`Invalid date format: "${dateStr}". Expected AAAA-MM-DD.`)
    }
    
    const monthName = months[month - 1]
    
    return `${day} de ${monthName} de ${year}`
}

export function parseDate(dateStr: string): Date {
    const months = ["jan.", "fev.", "mar.", "abr.", "mai.", "jun.", "jul.", "ago.", "set.", "out.", "nov.", "dez."]

    const parts = dateStr.split(' de ')

    if (parts.length !== 3) {
        throw new Error(`Invalid date format: "${dateStr}". Expected "DD de MMM. de AAAA".`)
    }

    const day = parseInt(parts[0], 10)
    const month = months.indexOf(parts[1])
    const year = parseInt(parts[2], 10)

    if (isNaN(day) || month === -1 || isNaN(year)) {
        throw new Error(`Invalid date values in "${dateStr}".`)
    }

    return new Date(year, month, day)
}
