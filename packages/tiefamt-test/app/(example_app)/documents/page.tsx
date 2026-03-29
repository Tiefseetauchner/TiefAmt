"use client";

import { GovBanner, GovNav, GovNavSection } from "@tiefamt/core";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

const navSections: GovNavSection[] = [
  {
    heading: "Index",
    items: [
      { label: "Test", href: "test" }
    ]
  }
];

export default function DocumentsPage() {
  const [active, setActive] = useState<{ sectIdx: number, itemIdx: number; }>();

  return (<>
    <GovBanner>This is a test site. Do not use for production.</GovBanner>
    <Container>
      <Row>
        <Col md={3} xs={12}>
          <GovNav sections={navSections} />
        </Col>
      </Row>
    </Container>
  </>);
}