import React from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@apollo/client";
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	Form,
	FormGroup,
} from "reactstrap";
import {
	MOVIE_LIST,
	DIRECTOR_LIST,
	ADD_MOVIE,
	ADD_DIRECTOR,
} from "../queries/query";

const SideNav = () => {
	const { data } = useQuery(DIRECTOR_LIST);
	const {
		register: registerMovie,
		handleSubmit: handlesubmitMovie,
	} = useForm();
	const {
		register: registerDirector,
		handleSubmit: handlesubmitDirecotr,
	} = useForm();

	const [addMovie] = useMutation(ADD_MOVIE, {
		refetchQueries: [{ query: MOVIE_LIST }],
		awaitRefetchQueries: true,
	});

	const [addDirector] = useMutation(ADD_DIRECTOR, {
		refetchQueries: [{ query: DIRECTOR_LIST }],
		awaitRefetchQueries: true,
	});

	const onSubmitMovie = ({ movieName, genreName, directorId }, event) => {
		addMovie({
			variables: { name: movieName, genre: genreName, directorId },
		});
		event.target.reset();
	};

	const onSubmitDirector = ({ directorName, directorAge }, event) => {
		const IntAge = parseInt(directorAge);
		addDirector({
			variables: { name: directorName, age: IntAge },
		});
		event.target.reset();
	};

	return (
		<div>
			<Card>
				<CardHeader>映画監督</CardHeader>
				<CardBody>
					<Form onSubmit={handlesubmitDirecotr(onSubmitDirector)}>
						<FormGroup>
							<input
								type="text"
								className="form-control"
								name="directorName"
								placeholder="監督名"
								ref={registerDirector}
							/>
						</FormGroup>
						<FormGroup>
							<input
								type="number"
								className="form-control"
								name="directorAge"
								placeholder="年齢"
								ref={registerDirector}
							/>
						</FormGroup>
						<Button color="primary" type="submit">
							追加
						</Button>
					</Form>
				</CardBody>
			</Card>

			<Card className="mt-4">
				<CardHeader>映画作品</CardHeader>
				<CardBody>
					<Form onSubmit={handlesubmitMovie(onSubmitMovie)}>
						<FormGroup>
							<input
								type="text"
								className="form-control"
								name="movieName"
								placeholder="タイトル"
								ref={registerMovie}
							/>
						</FormGroup>
						<FormGroup>
							<input
								type="text"
								className="form-control"
								name="genreName"
								placeholder="ジャンル"
								ref={registerMovie}
							/>
						</FormGroup>
						<FormGroup>
							<select
								className="form-control"
								type="select"
								name="directorId"
								ref={registerMovie}
							>
								{data &&
									data.directors.map((director) => (
										<option key={director.id} value={director.id}>
											{director.name}
										</option>
									))}
							</select>
						</FormGroup>
						<Button color="primary" type="submit">
							追加
						</Button>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
};

export default SideNav;
