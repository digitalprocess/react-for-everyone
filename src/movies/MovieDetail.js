import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { device } from '../device'

const BASE_URL = `${process.env.REACT_APP_API_URL}/movie/`
const API_KEY = `?api_key=${process.env.REACT_APP_API_KEY}`
const MOVIE_CONFIG_URL = `${process.env.REACT_APP_API_URL}/configuration?api_key=${process.env.REACT_APP_API_KEY}`

export default function MovieDetail() {
	const { id } = useParams()
	const [movie, setMovie] = useState({})
	const [config, setConfig] = useState({})

	useEffect(() => {
		const getMovie = async () => {
			try {
				const res = await fetch(BASE_URL + id + API_KEY)
				const newMovie = await res.json()
				setMovie(newMovie)
			} catch (error) {
				console.log(error)
			}
		}
		getMovie()

		const getConfig = async () => {
			try {
				const res = await fetch(MOVIE_CONFIG_URL)
				const config = await res.json()
				setConfig(config)
			} catch (error) {
				console.log(error)
			}
		}
		getConfig()
	}, [id])

	if (!movie.title) return null

	const images = config.images
	if (!config.images) return null

	return (
		<MovieDetailStyles backdrop={images.base_url + images.backdrop_sizes[3] + movie.backdrop_path}>
			{/* <img
				className="backdrop"
				src={images.base_url + images.backdrop_sizes[3] + movie.backdrop_path}
				alt={movie.title + 'Backdrop'}
			/> */}
			<div className="details">
				<img
					className="poster"
					src={images.base_url + images.poster_sizes[3] + movie.poster_path}
					alt={movie.title + ' Poster'}
				/>

				<div>
					<h1>{movie.title}</h1>
					<div className="subtitle">
						<h2>{movie.tagline}</h2>
						<h3>{new Date(movie.release_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}</h3>
					</div>
					<p>{movie.overview}</p>
					<ul>
						{movie.genres.map(genre => (
							<li key={genre.id}>{genre.name}</li>
						))}
					</ul>
				</div>
			</div>
		</MovieDetailStyles>
	)
}

const MovieDetailStyles = styled.div`
	position: relative;
	background-size: cover;
	@media ${device.tablet} {
		background: url(${props => props.backdrop}) no-repeat center;
		padding-top: 50vh;
	}
	.details {
		position: relative;
		background: white;
		color: #333;
		padding: 1rem;
		gap: 1rem;
		@media ${device.tablet} {
			display: flex;
		}
		h1 {
			text-align: center;
		}
		img {
			max-width: 100%;
			box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
			display: block;
			margin: auto;
			@media ${device.tablet} {
				margin-top: -160px;
			}
		}
	}
	.subtitle {
		@media ${device.mobileL} {
			display: flex;
			justify-content: space-between;
		}
	}
`
