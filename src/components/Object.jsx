import { useState } from 'react'

export default function Object({ userObjectInfo }) {
    let position_unit = ['vw', 'vh']

    const moveTranslate = userObjectInfo && userObjectInfo['positionX'] ? `translate(${userObjectInfo['positionX']}${position_unit[0]},${userObjectInfo['positionY']}${position_unit[1]})` : 'translate(0px,0px)';
    const rotate = userObjectInfo && userObjectInfo['rotate'] ? `rotate(${userObjectInfo['rotate']}deg)` : 'rotate(0deg)';
    const scale = userObjectInfo && userObjectInfo['scale'] ? `scale(${userObjectInfo['scale']})` : 'scale(0deg)';
    const bgColor = userObjectInfo && userObjectInfo['color'] ? userObjectInfo['color'] : '';

    return (
        <div style={{ transform: `${moveTranslate} ${rotate} ${scale}`, backgroundColor: `${bgColor}` }}
            className={`size-20 rounded-xl transition-all duration-300 ease-in-out`}>
        </div>
    );
}