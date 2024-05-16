// src/components/CodeBlock.js

import React from 'react';
import { useDrag } from 'react-dnd';

const CodeBlock = ({ id, text }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'CODE_BLOCK',
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                padding: '8px',
                margin: '4px',
                backgroundColor: 'lightgrey',
                cursor: 'move',
            }}
        >
            {text}
        </div>
    );
};

export default CodeBlock;
