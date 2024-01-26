import { Card, Col, Container, Row } from "react-bootstrap";
import StudentTeble from "../../component/Student/StudentTeble";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  editStudent,
  editStudentData,
} from "../../redux/student/action";

const Home = () => {
  const { editStu } = useSelector((state) => state.student);

  const dispatch = useDispatch();
  const [input, setInput] = useState({
    name: "",
    email: "",
    roll: "",
    photo: "",
  });

  const handleInputChenge = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (editStu.editMood) {
      dispatch(editStudentData(input));
      dispatch(editStudent(false, ""));
    } else {
      dispatch(createStudent(input));
    }

    setInput({ name: "", email: "", roll: "", photo: "" });
  };

  const handleInputReset = () => {
    dispatch(editStudent(false, ""));
    setInput({ name: "", email: "", roll: "", photo: "" });
  };

  useEffect(() => {
    setInput(editStu.data);
  }, [editStu.editMood === true]);

  return (
    <>
      <Container>
        <Row>
          <Col md="10" className="mx-auto">
            <div className="my-5">
              <Card>
                <Card.Body>
                  <form
                    className="d-flex gap-1"
                    onSubmit={handleInputSubmit}
                    onReset={handleInputReset}
                  >
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Name"
                      name="name"
                      value={input.name}
                      onChange={handleInputChenge}
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Email"
                      name="email"
                      value={input.email}
                      onChange={handleInputChenge}
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Roll"
                      name="roll"
                      value={input.roll}
                      onChange={handleInputChenge}
                    />
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Photo"
                      name="photo"
                      value={input.photo}
                      onChange={handleInputChenge}
                    />
                    <button className="btn btn-primary" type="submit">
                      {editStu.editMood ? "Update" : "Add"}
                    </button>

                    <button className="btn btn-primary" type="reset">
                      {editStu.editMood ? "Cencel" : "Reset"}
                    </button>
                  </form>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <StudentTeble />
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
