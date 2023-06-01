
import 'bootstrap/dist/css/bootstrap.min.css';
import { useMedia } from 'react-use'
import { Button, Col, Row } from 'react-bootstrap';
import Marquee from 'react-fast-marquee';
import { useNavigate  } from 'react-router-dom'

const Land = () => {

    const navigate = useNavigate();
    const handleClick = () => navigate('/base');

    const below800 = useMedia('(max-width: 800px)')
    const below700 = useMedia('(max-width: 700px)')
    const below600 = useMedia('(max-width: 600px)')
    const below500 = useMedia('(max-width: 500px)')
    const below400 = useMedia('(max-width: 400px)')

    const renderMarqueeComponent = () => {
        let result = [];
        for (let i = 0; i < 8; i++) {
            result.push(
                <div style={{ padding: '20px' }}>
                    <img className='w-280 h-280 marquee-img mb-20' src={"/assets/marquee_" + (i + 1) + '.jpg'} />
                </div>
            )
        }

        return result;
    }

    return (
        <div className='flex flex-column'>
            <div className='w-full main-bg block relative' style={{ minHeight: '100vh' }}>
                <video className='video' playsInline autoPlay muted loop poster="">
                    <source src="/assets/video-main-bg.mp4" type="video/mp4" />
                </video>
                <div className='marquee_div'>
                    <Marquee direction='up' autoFill style={{ visibility: 'visible', rotate: '-30deg', height: '100vh', marginLeft: '-5vw' }}>
                        {renderMarqueeComponent()}
                    </Marquee>
                </div>
                <div className='flex flex-column w-full justify-start absolute top-0 left-0' style={{ zIndex: 2 }}>

                    <div className='flex w-full items-center h-105 pl-60 pr-60 pt-20 pb-20 w-full'>
                        <Col sm={6} className="flex items-center">
                            <img className='fw-400 fs-32 w-125 h-30' src="/assets/myprofile.png" />
                        </Col>
                        <Col sm={6} className='flex justify-end items-center'>

                            {/* {!below800 && <div className="position-relative">
                                <i className="bi bi-bag text-white fs-24 ml-50"></i>
                                <span className="fs-10 position-absolute top-0 start-100 translate-middle badge rounded-pill border border-light bg-success">
                                    0
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </div>} */}

                            {/* {!below800 && <i className="bi bi-search text-white fs-24 ml-50"></i>} */}

                            <Button className='ml-50 w-150' variant='success' color='success' size='lg' onClick={handleClick}>
                                <span className='fs-16'>
                                    Get Started
                                </span>
                            </Button>
                        </Col>
                    </div>
                    <Row className='pl-60 pr-60 w-full' style={{ height: '35vw' }}>
                        <Col sm={6} className="items-center">
                            <div className='flex flex-column'>
                                <div className='flex flex-column text-white fs-80 fw-600'>
                                    <div className='flex items-center'>
                                        <span className='mr-15 lh-5vw'>Powerful </span>
                                        <span className="sldr-title-highlight mr-15 fs-80 fw-600" data-stylerecorder="true">AI</span>
                                        <span className="sldr-title-highlight mr-15 fs-80 fw-600" data-stylerecorder="true">Products</span>
                                    </div>
                                    <span className='lh-5vw'> for the AI future ready brands.</span>
                                </div>
                                <span className='text-white-65 mt-20 ts-16'>Download AI products</span>
                                <div className='flex justify-between mt-30'>
                                    <Button className='w-150' variant='success' color='success' size='lg' onClick={handleClick}>
                                        <span className='fs-16'>
                                            Get Started
                                        </span>
                                    </Button>
                                    <i className='bi bi-below-righ-arrow'></i>
                                </div>
                            </div>
                        </Col>
                        <Col sm={6}>
                            {/* <Marquee direction='up' style={{ visibility: 'visible', rotate: '-30deg', marginLeft:'-5vw' }}>
                            {renderMarqueeComponent()}
                        </Marquee> */}
                        </Col>
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
                            <span className='text-white fs-50 fw-500'>AI Image Generating </span>
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

export default Land;