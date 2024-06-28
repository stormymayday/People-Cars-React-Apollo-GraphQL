import { useQuery, gql } from "@apollo/client";

const TEST_QUERY = gql`
    query TestQuery {
        people {
            id
            firstName
            lastName
        }
    }
`;

const TestConnection = () => {
    const { loading, error, data } = useQuery(TEST_QUERY);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <div>
            <p>Hello World</p>
            {data.people.map((person) => (
                <div key={person.id}>
                    <p>
                        {person.firstName} {person.lastName}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default TestConnection;
