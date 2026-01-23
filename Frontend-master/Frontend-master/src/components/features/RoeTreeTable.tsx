import  { useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
const CustomNode = ({ data }: { data: any }) => {
  const borderColor = data.variance >= 0 ? 'green' : 'red';

  return (
    <div style={{
      border: `2px solid ${borderColor}`,
      borderRadius: 12,

      padding: 10,
      background: '#fff',
      width: 200,
      textAlign: 'center',
      fontSize: 12,
      boxShadow: '2px 2px 6px rgba(0,0,0,0.1)'
    }}>
      <strong style={{ fontSize: 14 }}>{data.label}</strong>
      <div>Budget: ₹{data.budget}</div>
      <div>Actual: ₹{data.actual}</div>
      <div style={{ fontWeight: 'bold', color: borderColor }}>
        Variance: ₹{data.variance}
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  customNode: CustomNode,
};

const nodes = [
  { id: '1', type: 'customNode', data: { label: 'PROFIT', budget: 450, actual: 465, variance: 15 }, position: { x: 300, y: 0 } },
  { id: '2', type: 'customNode', data: { label: 'TOTAL SALES', budget: 1100, actual: 1110, variance: 10 }, position: { x: 50, y: 150 } },
  { id: '3', type: 'customNode', data: { label: 'TOTAL COST', budget: 650, actual: 645, variance: -5 }, position: { x: 500, y: 150 } },
  { id: '4', type: 'customNode', data: { label: 'MATERIAL COST', budget: 400, actual: 390, variance: -10 }, position: { x: 400, y: 300 } },
  { id: '5', type: 'customNode', data: { label: 'LABOUR COST', budget: 100, actual: 105, variance: 5 }, position: { x: 600, y: 300 } },
  { id: '6', type: 'customNode', data: { label: 'OTHER COST', budget: 150, actual: 150, variance: 0 }, position: { x: 500, y: 450 } },
  { id: '7', type: 'customNode', data: { label: 'SALES QTY', budget: 600, actual: 620, variance: 20 }, position: { x: -50, y: 300 } },
  { id: '8', type: 'customNode', data: { label: 'SELLING PRICE', budget: 500, actual: 490, variance: -10 }, position: { x: 150, y: 300 } },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-7', source: '2', target: '7' },
  { id: 'e2-8', source: '2', target: '8' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e3-5', source: '3', target: '5' },
  { id: 'e3-6', source: '3', target: '6' },
];

const TreeChart = () => {
  const [selectedTab, setSelectedTab] = useState('ROE');

  return (
    <ReactFlowProvider>
      <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
        {/* Tab Buttons */}
        <div style={{ marginBottom: 10 }}>
          <button onClick={() => setSelectedTab('ROE')}>ROE</button>
          <button onClick={() => setSelectedTab('Other')}>Other</button>
        </div>

        {/* Chart Area */}
        <div style={{ width: '100%', height: '80vh', border: '1px solid #ccc' }}>
          {selectedTab === 'ROE' ? (
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
            >
              <Background />
              <Controls />
            </ReactFlow>
          ) : (
            <div style={{ padding: 20 }}>Other content goes here.</div>
          )}
        </div>
      </div>
    </ReactFlowProvider>
  );
};

export default TreeChart;
