import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Filter from '../Filter'
import Movie from './Movie'
import { device } from '../device'

const MOVIE_API_URL = `${process.env.REACT_APP_API_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
const MOVIE_CONFIG_URL = `${process.env.REACT_APP_API_URL}/configuration?api_key=${process.env.REACT_APP_API_KEY}`

export default function MoviesList() {
	const [filter, setFilter] = useState('')
	const [movies, setMovies] = useState([])
	const [config, setConfig] = useState({})

	const getMovies = async () => {
		try {
			const res = await fetch(MOVIE_API_URL)
			const movies = await res.json()
			setMovies(movies.results)
		} catch (error) {
			console.log(error)
		}
	}

	const getConfig = async () => {
		try {
			const res = await fetch(MOVIE_CONFIG_URL)
			const config = await res.json()
			setConfig(config)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getMovies()
		getConfig()
	}, [])

	return (
		<div>
			<Filter filter={filter} setFilter={setFilter} />
			<MoviesListStyles>
				{movies
					.filter(movie => movie.title.toLowerCase().includes(filter.toLocaleLowerCase()))
					.map(movie => <Movie key={movie.id} config={config} movie={movie} />)
				}
			</MoviesListStyles>
		</div>
	)
}

const MoviesListStyles = styled.ul`
	list-style: none;
	gap: 1rem;
	margin: 0;
	padding: 1rem;
	@media ${device.tablet} {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
	}

	img {
		width: 100%;
		box-shadow: 1px 1px 10px rgba( 0, 0, 0, 0.4)
	}
`
