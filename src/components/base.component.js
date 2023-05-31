
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMedia } from 'react-use'
import { Button, Col, Row, Navbar, Nav, Container, InputGroup, Form, Modal } from 'react-bootstrap';
import Marquee from 'react-fast-marquee';
import { useNavigate } from 'react-router-dom'

import React from 'react';
import { useEffect, useState, useContext } from "react";
import axios from 'axios'
import ClipLoader from "react-spinners/ClipLoader";
import { UserContext } from "../App";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode';
import constants from '../utils/constants';
import Login from './login.component';
import Dialog from "@mui/material/Dialog";
import { render } from '@testing-library/react';

const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

const Base = () => {

    const navigate = useNavigate();
    const handleClick = () => navigate('/home');

    const { imgUrls, setImageUrls } = useContext(UserContext);
    const [isSignin, setIsSignin] = useState(true)
    const [picRoute, setPicRoute] = useState('');
    const { signFlag, setSignFlag } = useContext(UserContext);
    const [about, setAbout] = useState('')
    const onAboutChange = (event) => {
        setAbout(event.target.value);
    };

    const [negativePrompt, setNegativePrompt] = useState('')
    const onNegativePromptChange = (event) => {
        setNegativePrompt(event.target.value);
    };

    const [username, setUsername] = useState('')
    const onUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const [userpwd, setUserPWD] = useState('')
    const [userpwdConfirm, setUserPWDConfirm] = useState('')
    const onUserPWDChange = (event) => {
        setUserPWD(event.target.value);
    };

    const { useremail, setUserEmail } = useContext(UserContext);
    const onEmailChange = (event) => {
        setUserEmail(event.target.value);
    };

    const [bLoadingFlag, setLoadingFlag] = useState(false)
    const [imageData, setImageData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            if (signFlag === false) {
                try {
                    const responseGet = await axios.post(
                        constants.baseUrl + '/api/getrecentgeneratedimages',
                        {
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                    if (responseGet !== 'fail') {
                        setImageUrls(responseGet.data.response);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
            else {
                try {

                    const responseByUser = await axios.post(
                        constants.baseUrl + '/api/auth/getrecentimagesbyuser',
                        {
                            email: useremail
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )

                    if (responseByUser.data.response !== 'fail') {
                        setImageUrls(responseByUser.data.response);
                    }
                    else {
                        setImageUrls([]);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchData();
    }, [signFlag])

    useEffect(() => {
        if (localStorage.jwtToken) {
            const token = localStorage.jwtToken;
            const decoded = jwt_decode(token);
            const expirationTime = decoded.exp;
            const currentTime = Date.now() / 1000;
            if (expirationTime < currentTime) {
                setSignFlag(false)
            } else {
                setUserEmail(localStorage.getItem('useremail'))
                setSignFlag(true)
            }
        } else {
            setSignFlag(false)
        }
    }, [])
    
    const onGenerate = async () => {
        if (about === '') {
            toast.error("Main Prompt is Empty.");
            return;
        }

        const prompt = about;
        const negative = negativePrompt;
        setLoadingFlag(true);
        const response = await axios.post(
            constants.baseUrl + '/api/auth/generateimage',
            {
                input: prompt,
                negative: negative,
                email: useremail
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        setPicRoute(response.data.response);
        setLoadingFlag(false);

        try {
            const responseByUser = await axios.post(
                constants.baseUrl + '/api/auth/getrecentimagesbyuser',
                {
                    email: useremail
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (responseByUser.data.response !== 'fail') {
                setImageUrls(responseByUser.data.response);
            }
            else {
                setImageUrls([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSignIn = async () => {
        const responseGet = await axios.post(
            constants.baseUrl + '/api/login',
            {
                username: username,
                password: userpwd,
                email: useremail
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )

        if (responseGet.data.success) {
            localStorage.setItem('jwtToken', responseGet.data.token);
            setAuthToken(responseGet.data.token)
            toast.success("Sign In success");
            handleDisplay(false)
            setUserEmail(useremail)
            localStorage.setItem('useremail', useremail);
            setSignFlag(true);
            try {
                const responseByUser = await axios.post(
                    constants.baseUrl + '/api/auth/getrecentimagesbyuser',
                    {
                        email: useremail
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )

                if (responseByUser.data.response !== 'fail') {
                    setImageUrls(responseByUser.data.response);
                }
                else {
                    setImageUrls([]);
                }
            } catch (error) {
                if (responseGet.data.message) toast.error(responseGet.data.message);
                else toast.error("Sign In fail");
            }
        }
        else {
            if (responseGet.data.message) toast.error(responseGet.data.message);
            else toast.error("Sign In fail");
            setSignFlag(false);
        }
    }

    const onLogOut = async () => {
        setSignFlag(false);
        if (localStorage.jwtToken) localStorage.removeItem('jwtToken')
        // try {
        //     const responseGet = await axios.post(
        //         constants.baseUrl + '/api/getrecentgeneratedimages',
        //         {
        //         },
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             }
        //         }
        //     )
        //     if (responseGet !== 'fail') {
        //         setImageUrls(responseGet.data.response);
        //     }
        // } catch (error) {
        //     console.log(error);
        // }
        setImageUrls([])
        setImageData([])
    };

    const onSignUp = async () => {
        if (!validateInput()) return;
        const responseGet = await axios.post(
            constants.baseUrl + '/api/checkifexisting',
            {
                email: useremail
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        if (responseGet.data.response === 'success') {
            toast.error("Already exists");
        }
        else {
            const responseCreate = await axios.post(
                constants.baseUrl + '/api/signupuser',
                {
                    username: username,
                    password: userpwd,
                    email: useremail
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )

            if (responseCreate.data.response === 'success') {
                toast.success("Sign Up success");
                setIsSignin(true)
                handleDisplay(false)
            }
            else {
                toast.error("Sign Up fail");
                setIsSignin(true)
            }
        }
    }


    const [openDialog, handleDisplay] = React.useState(false);

    const handleClose = () => {
        handleDisplay(false);
    };

    const openDialogBox = () => {
        setUserEmail('')
        setUserPWD('')
        setUserPWDConfirm('')
        setUsername('')
        handleDisplay(true);
    };

    const validateInput = () => {
        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        if (username.length < 6) {
            toast.error("Username length should be longer than 6. Please try again.")
            return false
        } else {
            const re = /^\S*$/;
            if (!re.test(username)) {
                toast.error("Username value is invalid. It must not contain special character.")
                return false
            }
        }
        if (userpwd.trim().length < 8) {
            toast.error("The length of password value should be at least 8. Please try again.")
            return false
        }
        if (userpwdConfirm !== userpwd) {
            toast.error("Password does not match. Please try again.")
            return false
        }
        if (useremail.trim().length === 0 || useremail.match(isValidEmail) === null) {
            toast.error("Email address value is invalid. Please try again")
            return false
        }
        return true
    }

    const onClickRegister = (e) => {
        if (isSignin) {
            setIsSignin(false)
        } else {
            onSignUp()
        }
    }

    const onBack = (e) => {
        if (!isSignin)
            setIsSignin(true)
    }

    const onClickAuth = () => {
        if (isSignin) {
            onSignIn()
        } else {
            onSignUp()
        }
    }

    useEffect(() => {
        let result = []
        let row = []
        for(let i = 0 ; i < imgUrls.length; i ++) {
            row.push(
                <Col sm={2} className='flex items-center justify-around'>
                    <img style={{ width: '10vw', height: '10vw' }} src={constants.baseUrl + '/images/' + imgUrls[i].photopath}></img>
                </Col>
            )
            if(i % 6 == 5) {
                result.push(
                    <Row className='mb-20 w-full'>
                        {row.map((element) => {
                            return element
                        })}
                    </Row>
                )
                row = []
            }
        }
        if(row.length > 0) {
            result.push(
                <Row className='w-full'>
                    {row}
                </Row>
            )
        }
        setImageData(result);
    }, [imgUrls])
    

    return (
        <div className='flex flex-column bottom-bg'>
            <Modal show={openDialog} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isSignin ? "Sign In" : "Sign Up"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                placeholder="UserName"
                                name="username"
                                value={username}
                                onChange={onUsernameChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                placeholder="Password"
                                name="userpwd"
                                type="password"
                                value={userpwd}
                                onChange={onUserPWDChange}
                            />
                        </Form.Group>
                        {!isSignin && <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                placeholder="Password Confirm"
                                name="confirm_userpwd"
                                type="password"
                                value={userpwdConfirm}
                                onChange={(e) => setUserPWDConfirm(e.target.value)}
                            />
                        </Form.Group>}
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                name="useremail"
                                value={useremail}
                                onChange={onEmailChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    {isSignin &&
                        <Button variant="primary" onClick={onClickAuth}>
                            Sign In
                        </Button>}
                    {!isSignin &&
                        <Button variant="primary" onClick={onBack}>
                            Back
                        </Button>}
                    <Button variant="primary" onClick={onClickRegister}>
                        Sign Up
                    </Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer autoClose={3000} draggableDirection='x' />
            <div className='w-full bottom-bg'>

                <div className='flex flex-column w-full justify-start top-0 left-0 bottom-bg' style={{ zIndex: 2 }}>

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
                            {!signFlag && (
                                <Button className='ml-50 w-150' variant='success' color='success' size='lg' onClick={openDialogBox}>
                                    <span className='fs-16'>
                                        Sign In
                                    </span>
                                </Button>
                            )}
                            {signFlag && (
                                <Button className='ml-50 w-150' variant='success' color='success' size='lg' onClick={onLogOut}>
                                    <span className='fs-16'>
                                        Log Out
                                    </span>
                                </Button>
                            )}
                        </Col>
                    </div>
                </div>
            </div>
            <div className='flex items-center' style={{ minHeight: '30vw' }}>
                <Col sm={6} className='flex flex-column'>
                    <Row className='pl-60 pr-60 mt-40 w-full bottom-bg flex flex-column items-center justify-center'>
                        <InputGroup className="mb-3" style={{ width: '50vw' }}>
                            <Form.Control
                                placeholder="Prompt here (e.g A cute dog)"
                                aria-describedby="basic-addon2"
                                value={about}
                                onChange={onAboutChange}
                            />
                        </InputGroup>
                    </Row>

                    <Row className='pl-60 pr-60 mt-20 w-full bottom-bg flex flex-column items-center justify-center'>
                        <InputGroup className="mb-3" style={{ width: '50vw' }}>
                            <Form.Control
                                placeholder="Negative Prompt here"
                                aria-describedby="basic-addon2"
                                value={negativePrompt}
                                onChange={onNegativePromptChange}
                            />
                        </InputGroup>
                    </Row>
                    <Row className='pl-60 pr-60 mt-20 w-full bottom-bg flex items-center justify-center'>
                        {signFlag &&
                            <Button className='w-150' variant='success' color='success' size='lg' onClick={onGenerate}>
                                <span className='fs-16'>
                                    Generate
                                </span>
                            </Button>
                        }
                    </Row>
                </Col>
                <Col sm={6} className='flex justify-center items-center'>
                    <div className='box flex items-center justify-center' style={{ width: '30vw', height: '30vw' }}>
                        {(!bLoadingFlag && picRoute !== '') && (
                            <img style={{ width: '29vw', height: '29vw' }} src={constants.baseUrl + '/images/' + picRoute}></img>
                        )}
                        {(!bLoadingFlag && picRoute === '') && (
                            <div style={{ width: '29vw', height: '29vw' }}></div>
                        )}
                        {(bLoadingFlag === true) &&
                            < ClipLoader
                                color='#ffffff'
                                loading={true}
                                cssOverride={true}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        }
                    </div>
                </Col>
            </div>
            <div className='pl-60 pr-60 mt-20 mb-20 flex flex-column items-center'>
                {imageData}
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