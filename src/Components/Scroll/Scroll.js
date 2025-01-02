import React, { useRef, useEffect } from "react";
import './Scroll.css'

const Scroll = (props) => {
    const scrollRef = useRef(null);

    useEffect(() => {
        const scrollElement = scrollRef.current;
        
        const handleScroll = () => {
            // Check if scrolled to bottom
            if (
                scrollElement.scrollHeight - scrollElement.scrollTop 
                <= scrollElement.clientHeight + 100 // 100px buffer
                && props.onReachBottom
            ) {
                props.onReachBottom();
            }
        };

        // Add scroll event listener
        scrollElement.addEventListener('scroll', handleScroll);

        // Cleanup listener
        return () => {
            scrollElement.removeEventListener('scroll', handleScroll);
        };
    }, [props.onReachBottom]);

    return (
        <div
            ref={scrollRef}
            style={{
                overflowY: 'scroll', 
                border: '2px solid black',
                boxShadow: '0px 0px 5px black',
                borderRadius: '15px',
                height: '70vh',
                width: '96vw',
                marginLeft: 'Auto',
                marginRight: 'Auto',
                background: 'rgb(0, 189, 0)'
            }}>
            {props.children}
        </div>
    )
}

export default Scroll