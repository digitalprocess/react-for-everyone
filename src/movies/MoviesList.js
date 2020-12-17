import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Filter from '../Filter'
import Movie from './Movie'
import { device } from '../viewport'

const MOVIE_API_URL = `${process.env.REACT_APP_API_URL}/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=`
const MOVIE_CONFIG_URL = `${process.env.REACT_APP_API_URL}/configuration?api_key=${process.env.REACT_APP_API_KEY}`

export default function MoviesList() {
	const [filter, setFilter] = useState('')
	const [movies, setMovies] = useState([])
	const [config, setConfig] = useState({})
	const [currentPage, setCurrentPage] = useState(1)

	const getMovies = async (page) => {
		try {
			const res = await fetch(MOVIE_API_URL + page)
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
		getMovies(currentPage)
		getConfig()
	}, [currentPage])

	return (
		<MoviesListWrapper>
			<div className="filter-wrapper">
				<button
					onClick={() => setCurrentPage(currentPage - 1)}
					disabled={currentPage === 1}
				>
					Prev
				</button>

				<Filter filter={filter} setFilter={setFilter} />

				<button
					onClick={() => setCurrentPage(currentPage + 1)}
					disabled={currentPage === 10}
				>
					Next
				</button>
			</div>
			<MoviesListStyles>
				{movies
					.filter(movie => movie.title.toLowerCase().includes(filter.toLocaleLowerCase()))
					.map(movie => <Movie key={movie.id} config={config} movie={movie} />)
				}
			</MoviesListStyles>
		</MoviesListWrapper>
	)
}

const MoviesListStyles = styled.ul`
	list-style: none;
	margin: 0;
	padding: 1rem;
	display: grid;
	gap: 1rem;
	justify-content: center;

	@media ${device.mobileL} {
		grid-template-columns: repeat(2, 1fr);
	}

	@media ${device.tablet} {
		grid-template-columns: repeat(4, 1fr);
	}

	@media ${device.laptop} {
		grid-template-columns: repeat(5, 1fr);
	}

	@media ${device.laptopL} {
		grid-template-columns: repeat(7, 1fr);
	}

	img {
		width: 100%;
		box-shadow: 1px 1px 10px rgba( 0, 0, 0, 0.4)
	}
`
const MoviesListWrapper = styled.div`
	position: relative;
	padding-top: 3rem;
	.filter-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		padding: 0.9rem;
		background: rgba(0, 0, 0, 0.7);
		display: flex;
		justify-content: center;
	}
	input {
		display: block;
		width: calc(100% - 0.9rem);
		margin: auto 1rem;
		@media ${device.tablet} {
			display: inline;
			width: auto;
		}
	}
	button{
		cursor: pointer;
		&:disabled {
			cursor: not-allowed;
		}
	}
`