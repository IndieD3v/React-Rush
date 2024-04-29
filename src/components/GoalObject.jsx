import { useState } from 'react'

export default function Object({ goalObjectInfo }) {

    let position_unit = ['vw', 'vh']

    const moveTranslate = goalObjectInfo && goalObjectInfo['positionX'] ? `translate(${goalObjectInfo['positionX']}${position_unit[0]},${goalObjectInfo['positionY']}${position_unit[1]})` : 'translate(0px,0px)';
    const rotate = goalObjectInfo && goalObjectInfo['rotate'] ? `rotate(${goalObjectInfo['rotate']}deg)` : 'rotate(0deg)';
    const scale = goalObjectInfo && goalObjectInfo['scale'] ? `scale(${goalObjectInfo['scale']})` : 'scale(0deg)';
    const bgColor = goalObjectInfo && goalObjectInfo['color'] ? goalObjectInfo['color'] : 'transparent';

    return (
        <div style={{ transform: `${moveTranslate} ${rotate} ${scale}`, backgroundColor: `${bgColor}` }}
            className={`absolute size-20 rounded-xl transition-all duration-300 ease-in-out ${goalObjectInfo && goalObjectInfo['color'] || 'border-2 border-violet-400'}`}>
        </div>
    );
}