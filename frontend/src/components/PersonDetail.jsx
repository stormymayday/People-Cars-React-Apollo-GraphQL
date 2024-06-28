import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../graphql";
import { Card, Button } from "antd";

const PersonDetail = () => {
    const { id } = useParams();
    const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
        variables: { id },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const person = data.person;

    return (
        <div>
            <h1>
                {person.firstName} {person.lastName}
            </h1>
            <Link to="/">
                <Button type="primary">Back to Home</Button>
            </Link>
            {person.cars.map((car) => (
                <Card
                    key={car.id}
                    title={`${car.make} ${car.model}`}
                    style={{ marginBottom: 20 }}
                >
                    <p>Year: {car.year}</p>
                    <p>Price: ${car.price}</p>
                </Card>
            ))}
        </div>
    );
};

export default PersonDetail;
