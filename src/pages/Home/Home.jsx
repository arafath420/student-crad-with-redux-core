import { Card, Col, Container, Row } from "react-bootstrap";
import StudentTeble from "../../component/Student/StudentTeble";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  editStudent,
  editStudentData,
} from "../../redux/student/action";
import Swal from "sweetalert2";

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
      Swal.fire({
        title: `Hello ${input.name} Do you want to save the changes?`,
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          dispatch(editStudentData(input));
          Swal.fire("Saved!", "", "success");
          dispatch(editStudent(false, ""));
          setInput({ name: "", email: "", roll: "", photo: "" });
        } else if (result.isDenied) {
          Swal.fire(`Hello ${input.name} Changes are not saved`, "", "info");
        }
      });
    } else {
      dispatch(createStudent(input));
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: `Hello ${input.name} Welocome`,
        showConfirmButton: false,
        timer: 1500,
      });
      setInput({ name: "", email: "", roll: "", photo: "" });
    }
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
