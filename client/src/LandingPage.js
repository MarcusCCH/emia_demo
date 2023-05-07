import { useState, useLayoutEffect } from "react";
import './LandingPage.css';

const LandingPage = (props) => {
    const [show, setShow] = useState(false);

    useLayoutEffect(() => {
        setShow(true);
    }, []);

    // const onAnimationEnd = () => {
    //     console.log("onAnimationEnd");
    //     setShow(false);
    //     props.onAnimationComplete();
    // }
    const onAnimationComplete = () => {
        setShow(false);
        props.onAnimationComplete();
    };

    return (
        <div className="container">
            {show && (
                <div className="box" onAnimationEnd={onAnimationComplete}>
                    <div className="text">USTudyPet</div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;