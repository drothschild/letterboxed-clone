import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import Form from './styles/Form';
import Error from './Error';

const CREATE_MOVIE_MUTATION = gql`
    mutation CREATE_MOVIE_MUTATION(
        $title: String!
        $description: String!
        $year: Int
        $image: String
    ) {
        createMovie(
            title: $title
            description: $description
            year: $year
            image: $image
        ) {
            id
        }
    }
`;

class CreateMovie extends Component {
    state = {
        title: '',
        description: '',
        year: '',
        image: '',
        imageLoading: false
    };
    handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        this.setState({
            [name]: val
        });
    };
    uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        this.setState({ imageUploading: true });
        data.append('upload_preset', 'moviePoster');
        const res = await fetch(process.env.REACT_APP_UPLOAD_URL, {
            method: 'Post',
            body: data
        });
        const file = await res.json();
        this.setState({
            image: file.secure_url,
            imageUploading: false
        });
    };

    render() {
        return (
            <Mutation mutation={CREATE_MOVIE_MUTATION} variables={this.state}>
                {(createMovie, { loading, error }) => (
                    <Form
                        onSubmit={async e => {
                            e.preventDefault();
                            const res = await createMovie();
                            navigate(`/movies/${res.data.createMovie.id}`);
                        }}
                    >
                        <h2>Add a movie</h2>
                        {error && <Error error={error} />}
                        <fieldset
                            disabled={loading || this.state.imageUploading}
                            aria-busy={loading || this.state.imageUploading}
                        >
                            <label htmlFor="file">File</label>
                            <input
                                type="file"
                                id="file"
                                name="file"
                                placeholder="Upload an Image"
                                required
                                onChange={this.uploadFile}
                            />
                            {this.state.image && (
                                <img
                                    width="200"
                                    src={this.state.image}
                                    alt="Upload Preview"
                                />
                            )}
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                required
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="year">Year</label>
                            <input
                                type="number"
                                id="year"
                                name="year"
                                placeholder="Year"
                                required
                                value={this.state.year}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Enter a Description"
                                required
                                value={this.state.description}
                                onChange={this.handleChange}
                            />
                            <button type="submit">Submit</button>
                        </fieldset>
                    </Form>
                )}
            </Mutation>
        );
    }
}

export default CreateMovie;
