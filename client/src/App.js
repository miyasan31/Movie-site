import React from "react";
import { Container, Row, Col } from "reactstrap";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client";

import Header from "./components/Header";
import SideNav from "./components/SideNav";
import MovieList from "./components/MovieList";

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql",
	cache: new InMemoryCache(),
});

const App = () => {
	return (
		<div className="App">
			<Header />
			<Container>
				<ApolloProvider client={client}>
					<Row>
						<Col xs={12} sm={4}>
							<SideNav />
						</Col>
						<Col xs={12} sm={8}>
							<MovieList />
						</Col>
					</Row>
				</ApolloProvider>
			</Container>
		</div>
	);
};

export default App;
