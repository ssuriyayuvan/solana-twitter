import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { NextPage } from "next";
import Link from "next/link";
import { Navbar, Container, Nav } from "react-bootstrap";
// Nav

const index: NextPage = () => {
    return (
      <>
        <Navbar bg="light" expand="lg">
      <Container fluid>
        <Link href="/">
        <Navbar.Brand >Home</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Link href="/mytweet">
            <a>My Tweets</a>
            </Link>
            {/* <Nav.Link href="#action2">Link</Nav.Link> */}
            
          </Nav>
          <WalletMultiButton />
          {/* <button type="button" className="btn btn-primary">Connect Wallet</button> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
      {/* I'm from index */}
      </>
    )
}

export default index;