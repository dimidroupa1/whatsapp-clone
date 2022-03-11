import { Circle } from 'better-react-spinkit';
import React from 'react';
import styled from 'styled-components';

function Loading() {
    return (
        <center style={{display: "grid", placeItems: "center", height: "100vh"}}>
            <div>
                <img src="https://freevectorlogo.net/wp-content/uploads/2013/04/whatsapp-vector-logo.png"
                    height={300}
                    style={{ marginBottom: 10 }}
                />
                <Circle color="#3CBC28" size={80} />
            </div>
        </center>
    );
}

export default Loading;
