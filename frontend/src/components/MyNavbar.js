import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const MyNavbar = (curUser) => {
    useEffect(() => {
        console.log("CU: ", curUser);
    }, [])
    return (
        <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="/">CannyOJ</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/problems">Problems</Nav.Link>
                <Nav.Link href="/submissions">Submissions</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
                <Nav.Link href={curUser.curUser ?`/users/${curUser.curUser}` : "/login"}>{curUser.curUser? curUser.curUser : "Login"}</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
    )
}

export default MyNavbar;