
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMedia } from 'react-use'
import { Button, Col, Row, Navbar, Nav, Container, InputGroup, Form } from 'react-bootstrap';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom'

const Base = () => {

    const navigate = useNavigate();
    const handleClick = () => navigate('/home');

    const below800 = useMedia('(max-width: 800px)')
    const below700 = useMedia('(max-width: 700px)')
    const below600 = useMedia('(max-width: 600px)')
    const below500 = useMedia('(max-width: 500px)')
    const below400 = useMedia('(max-width: 400px)')

    return (
        <div className='flex flex-column bottom-bg'>
            <div className='w-full bottom-bg' style={{ minHeight: '25vw' }}>

                <div className='flex flex-column w-full justify-start absolute top-0 left-0 bottom-bg' style={{ zIndex: 2 }}>

                    <div className='flex w-full items-center h-105 pl-60 pr-60 pt-20 pb-20 w-full'>
                        <Col sm={6} className="flex items-center">
                            <img className='fw-400 fs-32 w-125 h-30' src="/assets/myprofile.png" />
                        </Col>
                        <Col sm={6} className='flex justify-end items-center text-white'>
                            <Nav activeKey="/home">
                                <Nav.Item>
                                    <Nav.Link className='text-divider hover' href="/home">Home</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </div>
                    <Row className='pl-60 pr-60 mt-40 w-full bottom-bg flex flex-column items-center justify-center'>
                        <InputGroup className="mb-3" style={{width: '50vw'}}>
                            <Form.Control
                                placeholder="please insert cmd arguments"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Row>

                    <Row className='pl-60 pr-60 mt-40 w-full bottom-bg flex flex-column items-center justify-center'>
                        <InputGroup className="mb-3" style={{width: '50vw'}}>
                            <Form.Control
                                placeholder="please insert cmd arguments"
                                aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </Row>
                </div>
            </div>
            <div className='flex flex-column pl-100 pr-100 pt-60 pb-40 bottom-bg'>
                <Row>
                    <Col sm={6} >
                        <span className='text-white fs-50 fw-500'>Quirky</span>
                    </Col>
                    <Col sm={6} >
                        <h2>
                            <span className='text-white fs-50 fw-500'>NFT Marketplace with everything </span>
                            <span className='text-pink fs-50 f2-500'>for everyone</span>
                        </h2>
                    </Col>
                </Row>
            </div>
            <div className='w-full pt-20 pb-20 pr-60 pl-60 bottom-bg'>
                <div className='divider-bg w-full h-1'></div>
            </div>

            <div className="flex justify-between items-center ml-100 mr-100 bottom-bg pb-20">
                <Col className='flex items-center'>
                    <span className="text-divider">
                        &copy; {new Date().getFullYear()} All rights reserved.
                    </span>
                </Col>
                <Col className="flex items-center justify-around">
                    <a href="#" className="text-divider hover mr-4" style={{ textDecoration: 'none' }}>
                        FAQ
                    </a>
                    <a href="#" className="text-divider hover mr-4" style={{ textDecoration: 'none' }}>
                        Privacy Policy
                    </a>
                    <a href="#" className="text-divider hover mr-4" style={{ textDecoration: 'none' }}>
                        Terms of Use
                    </a>
                    <a href="#" className="text-divider hover" style={{ textDecoration: 'none' }}>
                        Contact Us
                    </a>
                </Col>
            </div>
        </div>
    )
}

export default Base;