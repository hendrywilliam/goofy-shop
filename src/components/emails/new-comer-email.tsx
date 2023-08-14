import { Head } from "@react-email/head";
import { Html } from "@react-email/html";
import { Text } from "@react-email/text";
import { Body } from "@react-email/body";

export function NewComerEmail() {
  return (
    <Html lang="en">
      <Head>
        <title>Hi welcome to ss, we hate you.</title>
      </Head>
      <Body>
        <Text>This is test email</Text>
        <Text>CEO PT. Gadis Koleris</Text>
        <Text>Freyana</Text>
      </Body>
    </Html>
  );
}
