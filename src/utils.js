export function formatRuntime(runtime) {
	const hours = Math.floor(runtime / 60)
	const minutes = runtime % 60
	return `${hours > 0 ? hours + 'h' : ''} ${minutes > 0 ? minutes + 'm' : ''}`
}

export function formatDate(date, locale, options) {
	return new Date(date).toLocaleDateString(locale, options)
}

export function isNotOutYet(date) {
	const today = new Date().getTime()
	return date > today
}
