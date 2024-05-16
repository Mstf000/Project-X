// src/components/CodeArea.js

import React from 'react';
import { useDrop } from 'react-dnd';
import CodeBlock from './CodeBlock';

const CodeArea = ({ blocks, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'CODE_BLOCK',
        drop: (item) => onDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            style={{
                padding: '16px',
                width: '400px',
                height: '400px',
                border: '2px dashed grey',
                backgroundColor: isOver ? 'lightblue' : 'white',
            }}
        >
            {blocks.map((block, index) => (
                <CodeBlock key={index} id={block.id} text={block.text} />
            ))}
        </div>
    );
};

export default CodeArea;
