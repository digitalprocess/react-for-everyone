import React, {useState} from 'react'
import Filter from '../Filter'
import Movie from './Movie'

const movies = [
	{
		name: 'Shawshank Redemption'
	},
	{
		name: 'The Usual Suspects'
	},
	{
		name: 'Best In Show'
	},
]

export default function MoviesList() {
	const [filter, setFilter] = useState('')
	return (
		<div>
			<Filter filter={filter} setFilter={setFilter} />
			<ul>
				{movies
					.filter(movie => movie.name.toLowerCase().includes(filter.toLocaleLowerCase()))
					.map(movie => <Movie key={movie.name} movie={movie} />)
				}
			</ul>
		</div>
	)
}
