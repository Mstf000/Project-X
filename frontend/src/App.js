// src/App.js

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import CodeBlock from './components/CodeBlock';
import CodeArea from './components/CodeArea';

const App = () => {
  const [codeBlocks, setCodeBlocks] = useState([
    { id: 1, text: 'print("Hello World")' },
    { id: 2, text: 'for i in range(5):' },
    { id: 3, text: '  print(i)' },
  ]);

  const [droppedBlocks, setDroppedBlocks] = useState([]);

  const handleDrop = (id) => {
    const block = codeBlocks.find((block) => block.id === id);
    setDroppedBlocks([...droppedBlocks, block]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '50px' }}>
        <div>
          {codeBlocks.map((block) => (
            <CodeBlock key={block.id} id={block.id} text={block.text} />
          ))}
        </div>
        <CodeArea blocks={droppedBlocks} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
};

export default App;
