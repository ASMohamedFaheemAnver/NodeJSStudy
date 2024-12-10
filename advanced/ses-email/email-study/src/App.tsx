import {
  Container,
  Heading,
  Img,
  Link,
  Text,
  Hr,
} from "@react-email/components";

function App() {
  return (
    <Container style={{ color: "#475467" }}>
      <Img
        src="data:image/png;base64,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"
        alt="fasten-logo"
        width="130"
        height="34"
      />
      <Text>Dear {"[Cardholder’s First Name]"},</Text>
      <Text>
        We are pleased to inform you that your payment for your Fasten™ Rewards
        Visa Card has been successfully received.
      </Text>
      <Heading as="h3">Payment Details:</Heading>
      <ul style={{ paddingLeft: 24 }}>
        <li>Payment Amount: {"${{##.##}}"}</li>
        <li>Payment Date: {"{{Month DD, YYYY}}"}</li>
        <li>New Balance: {"${{##.##}}"}</li>
      </ul>
      <Text>
        Thank you for your payment. Your account has been updated accordingly.
      </Text>
      <Text>
        To view your updated balance or manage your account, please log in to
        your account:
      </Text>
      <Container
        style={{
          marginTop: 24,
          width: "auto",
        }}
      >
        <Link
          style={{
            backgroundColor: "#5A8090",
            borderRadius: 8,
            border: 1,
            padding: "12px 72px",
            color: "#FFFFFF",
          }}
          href={"#"}
        >
          LOGIN
        </Link>
      </Container>
      <Hr
        style={{
          border: 0,
          borderTop: 2,
          borderStyle: "groove",
          color: "#475467",
          marginTop: 72,
        }}
      />
      <Heading as="h3" style={{ textAlign: "center" }}>
        Important Information from Fasten Rewards
      </Heading>
      <Container style={{ width: "auto" }}>
        <Link
          style={{
            color: "#5A8090",
            textDecoration: "underline",
          }}
        >
          Contact us
        </Link>
        <span
          style={{
            color: "#5A8090",
            marginRight: 18,
            marginLeft: 18,
          }}
        >
          |
        </span>
        <Link
          style={{
            color: "#5A8090",
            textDecoration: "underline",
          }}
        >
          Privacy
        </Link>
        <span
          style={{
            color: "#5A8090",
            marginRight: 18,
            marginLeft: 18,
          }}
        >
          |
        </span>
        <Link
          style={{
            color: "#5A8090",
            textDecoration: "underline",
          }}
        >
          Account
        </Link>
      </Container>
      <Text>
        Please do not reply to this message, as this email inbox is not
        monitored.
      </Text>
      <Text>
        This email was sent to {"[email address]"}. You received this email
        because you applied for a Fasten™ Rewards Visa Card. Terms and
        conditions apply. See site for details. Restrictions apply. Fasten
        Rewards, Inc. reserves the right to modify or discontinue its products
        or offerings at any time and without notice. The Fasten™ Rewards Visa
        Card is issued by Celtic Bank, Member FDIC, pursuant to a license by
        Visa Inc.
      </Text>
      <Text>DA026.6</Text>
    </Container>
  );
}

export default App;
