import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Body } from "@react-email/body";
import { Hr } from "@react-email/hr";
import { Container } from "@react-email/container";
import { Heading } from "@react-email/heading";
import { Section } from "@react-email/section";

//tailwind -> slow render
//move to the og -> css

function NewComerEmail({ fullName }: { fullName: string }) {
  return (
    <Html>
      <Head>
        <title>New Comer Email</title>
      </Head>
      <Body style={customStyle.body}>
        <Container style={customStyle.container}>
          <Heading as="h1">Spaceshop8</Heading>
          <Text style={customStyle.text}>Glad you made it! {fullName}</Text>
          <Text>
            Thanks for choosing us as a platform to host your own places. Make
            sure to join partnership and start accepting payment.
          </Text>
          <Hr />
          <Section>
            <Text style={customStyle.text}>Ayerf Anadrawayaj</Text>
            <Text style={customStyle["text-muted"]}>CEO PT. Gadis Koleris</Text>
          </Section>
          <Section>
            <Text>Spaceshop8 - All rights reserved</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

type StyleElement = "body" | "container" | "text" | "text-muted";

const customStyle: Record<StyleElement, React.CSSProperties> = {
  body: {
    background: "hsl(210, 50%, 98%)",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    margin: 0,
  },
  container: {
    background: "hsl(0, 0%, 100%)",
    margin: "32px auto",
    padding: "2rem",
    borderRadius: "0.375rem",
  },
  text: {
    margin: "0",
  },
  "text-muted": {
    color: "hsl(0, 0%, 67%)",
    margin: "0",
  },
};

export { NewComerEmail };
