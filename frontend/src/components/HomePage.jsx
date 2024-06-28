import { useQuery, useMutation } from "@apollo/client";
import {
    GET_PEOPLE,
    ADD_PERSON,
    DELETE_PERSON,
    ADD_CAR,
    DELETE_CAR,
} from "../graphql";
import { Link } from "react-router-dom";
import { Card, Form, Input, Button, Select } from "antd";

const HomePage = () => {
    const { loading, error, data } = useQuery(GET_PEOPLE);
    const [addPerson] = useMutation(ADD_PERSON, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });
    const [deletePerson] = useMutation(DELETE_PERSON, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });
    const [addCar] = useMutation(ADD_CAR, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });
    const [deleteCar] = useMutation(DELETE_CAR, {
        refetchQueries: [{ query: GET_PEOPLE }],
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    const onFinishPerson = (values) => {
        addPerson({
            variables: {
                firstName: values.firstName,
                lastName: values.lastName,
            },
        });
    };

    const onFinishCar = (values) => {
        addCar({
            variables: {
                year: parseInt(values.year),
                make: values.make,
                model: values.model,
                price: parseFloat(values.price),
                personId: values.personId,
            },
        });
    };

    return (
        <div>
            <h1>People and their Cars</h1>
            <h2>Add Person</h2>
            <Form onFinish={onFinishPerson}>
                <Form.Item
                    name="firstName"
                    label="First Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    label="Last Name"
                    rules={[{ required: true }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Person
                    </Button>
                </Form.Item>
            </Form>
            {data.people.length > 0 && (
                <>
                    <h2>Add Car</h2>
                    <Form onFinish={onFinishCar}>
                        <Form.Item
                            name="year"
                            label="Year"
                            rules={[{ required: true }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="make"
                            label="Make"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="model"
                            label="Model"
                            rules={[{ required: true }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="price"
                            label="Price"
                            rules={[{ required: true }]}
                        >
                            <Input type="number" />
                        </Form.Item>
                        <Form.Item
                            name="personId"
                            label="Person"
                            rules={[{ required: true }]}
                        >
                            <Select>
                                {data.people.map((person) => (
                                    <Select.Option
                                        key={person.id}
                                        value={person.id}
                                    >
                                        {person.firstName} {person.lastName}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add Car
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
            <h2>Records</h2>
            {data.people.map((person) => (
                <Card
                    key={person.id}
                    title={`${person.firstName} ${person.lastName}`}
                    style={{ marginBottom: 20 }}
                >
                    <Button
                        onClick={() =>
                            deletePerson({ variables: { id: person.id } })
                        }
                    >
                        Delete Person
                    </Button>
                    <Link to={`/people/${person.id}`}>
                        <Button type="link">Learn More</Button>
                    </Link>
                    {person.cars.map((car) => (
                        <Card
                            key={car.id}
                            type="inner"
                            title={`${car.make} ${car.model}`}
                        >
                            <p>Year: {car.year}</p>
                            <p>Price: ${car.price}</p>
                            <Button
                                onClick={() =>
                                    deleteCar({ variables: { id: car.id } })
                                }
                            >
                                Delete Car
                            </Button>
                        </Card>
                    ))}
                </Card>
            ))}
        </div>
    );
};

export default HomePage;
