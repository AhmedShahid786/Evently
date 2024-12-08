import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
} from "@react-email/components";

export default function VerificationEmail({ otp }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>OTP For Evently</title>
        <Font
          fontFamily="Roboto"
          fallBackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1KG.woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your otp: {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Greetings!</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for registering on Evently. Please use the following OTP
            to complete your registration
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          <Text>
            If you did not request this code, please ignore this email.
          </Text>
        </Row>
        <Row>
          <Text></Text>
        </Row>
        <Row>
          <Text>Best Regards,</Text>
        </Row>
        <Row>
          <Text>Team@Evently</Text>
        </Row>
      </Section>
    </Html>
  );
}
