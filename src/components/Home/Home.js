import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import homeLogo from "../../Assets/image.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";

function Home() {
  return (
    <section className="w-full">
      <Container fluid className="home-section w-full min-h-screen" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="">
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There!{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  ☠️
                </span>
              </h1>

              <h1 className="heading-name">
                I'M
                <strong className="main-name"> DIFF MONSTER</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                src={homeLogo}
                alt="home pic"
                className="img-fluid rounded-2xl"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
