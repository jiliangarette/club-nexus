import ModeToggle from "@/components/DarkMode";
import Col from "@/components/chunks/Col";
import Row from "@/components/chunks/Row";
import Section from "@/components/chunks/Section";
import { Button } from "@/components/ui/button";

function LandingPage() {
  return (
    <>
      <Col className="border px-4">
        {/* This is Header Section for Landing Page */}
        <Section className="flex flex-row place-items-center w-full justify-end h-16 border gap-2 md:gap-4 md:px-2">
          <Row>
            <ModeToggle />
          </Row>
          <Row>
            <Button className="font-mona font-semibold">Sign in</Button>
          </Row>
        </Section>
        <Section className="flex flex-col md:flex-row w-full place-items-center justify-between">
         <Col className="border w-full">wata ta</Col>
         <Col className="border w-full">image</Col>
        </Section>
      </Col>
    </>
  );
}
export default LandingPage;
