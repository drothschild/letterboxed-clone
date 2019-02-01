import React, { useState } from 'react';
import { useMutation } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { navigate } from '@reach/router';
import Form from './styles/Form';
import Error from './Error';
import Auth from './Auth';
import { ALL_MOVIES_QUERY } from './Movies';

const CREATE_MOVIE_MUTATION = gql`
    mutation CREATE_MOVIE_MUTATION(
        $title: String!
        $description: String!
        $year: Int!
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

function CreateMovie() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        year: '',
        image: ''
    });
    const [imageUploading, setImageUploading] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const createMovie = useMutation(CREATE_MOVIE_MUTATION, {
        variables: form,
        refetchQueries: [{ query: ALL_MOVIES_QUERY }]
    });
    const handleChange = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) : value;
        setForm({ ...form, [name]: val });
    };

    const uploadFile = async e => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        setImageUploading(true);
        data.append('upload_preset', 'moviePoster');
        const res = await fetch(process.env.REACT_APP_UPLOAD_URL, {
            method: 'Post',
            body: data
        });
        const file = await res.json();
        setForm({ ...form, image: file.secure_url });
        setImageUploading(false);
    };

    const submitForm = async e => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createMovie();
            navigate(`/movies/${res.data.createMovie.id}`);
        } catch (err) {
            setError(err);
        }
        setLoading(false);
    };
    return (
        <Auth>
            <Form onSubmit={submitForm}>
                <h2>Add a movie</h2>
                {error && <Error error={error} />}
                <fieldset
                    disabled={loading || imageUploading}
                    aria-busy={loading || imageUploading}
                >
                    <label htmlFor="file">File</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload an Image"
                        required
                        onChange={uploadFile}
                    />
                    {form.image && (
                        <img
                            width="200"
                            src={form.image}
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
                        value={form.title}
                        onChange={handleChange}
                    />
                    <label htmlFor="year">Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Year"
                        required
                        value={form.year}
                        onChange={handleChange}
                    />
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter a Description"
                        required
                        value={form.description}
                        onChange={handleChange}
                    />
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </fieldset>
            </Form>
        </Auth>
    );
}

export default CreateMovie;
