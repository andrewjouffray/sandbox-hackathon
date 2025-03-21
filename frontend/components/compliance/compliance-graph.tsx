'use client';

import { useCallback } from 'react';
import ReactFlow, {
  type Node,
  type Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// Custom node styles
import { CSSProperties } from 'react';

const nodeStyles: { [key: string]: CSSProperties } = {
  deployment: {
    padding: 10,
    borderRadius: 5,
    border: '1px solid #e0e0e0',
    backgroundColor: 'white',
    width: 180,
    textAlign: 'center',
    fontSize: 12,
  },
  device: {
    padding: 10,
    borderRadius: 5,
    border: '1px solid #e0e0e0',
    backgroundColor: 'white',
    width: 180,
    textAlign: 'center',
    fontSize: 12,
  },
  region: {
    padding: 10,
    borderRadius: 5,
    border: '1px solid #e0e0e0',
    backgroundColor: '#f5f6fa',
    width: 220,
    height: 40,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
};

// Initial nodes
const initialNodes: Node[] = [
  // Regions
  {
    id: 'europe',
    type: 'input',
    data: { label: 'Europe' },
    position: { x: 100, y: 50 },
    style: nodeStyles.region,
  },
  {
    id: 'north-america',
    type: 'input',
    data: { label: 'North America' },
    position: { x: 500, y: 50 },
    style: nodeStyles.region,
  },

  // Deployments and devices
  {
    id: 'ios-myapp',
    data: {
      label: (
        <div>
          <div>iOS: myapp</div>
          <div>versions: 0.3, 0.4, 0.5</div>
          <div>410212 users reporting</div>
        </div>
      ),
    },
    position: { x: 70, y: 150 },
    style: nodeStyles.device,
    sourcePosition: Position.Right,
  },
  {
    id: 'device-sensor-eu',
    data: {
      label: (
        <div>
          <div>device: sensor</div>
          <div>versions: 1.0</div>
          <div>1 device reporting</div>
        </div>
      ),
    },
    position: { x: 70, y: 300 },
    style: nodeStyles.device,
    sourcePosition: Position.Right,
  },
  {
    id: 'ingress-myapp',
    data: {
      label: (
        <div>
          <div>deployment:</div>
          <div>ingress.myapp.com</div>
          <div>version: 2.1</div>
        </div>
      ),
    },
    position: { x: 350, y: 200 },
    style: nodeStyles.deployment,
    targetPosition: Position.Left,
    sourcePosition: Position.Right,
  },
  {
    id: 'db-myapp',
    data: {
      label: (
        <div>
          <div>deployment:</div>
          <div>db.myapp.com</div>
          <div>version 1.4.2</div>
        </div>
      ),
    },
    position: { x: 550, y: 120 },
    style: nodeStyles.deployment,
    targetPosition: Position.Left,
  },
  {
    id: 'chicago-office',
    data: {
      label: (
        <div>
          <div>deployment: chicago</div>
          <div>office</div>
        </div>
      ),
    },
    position: { x: 550, y: 250 },
    style: nodeStyles.deployment,
    targetPosition: Position.Left,
  },
  {
    id: 'device-sensor-na',
    data: {
      label: (
        <div>
          <div>device: sensor</div>
          <div>versions: 1.0, 1.1, 1.2</div>
          <div>801 devices reporting</div>
        </div>
      ),
    },
    position: { x: 350, y: 350 },
    style: nodeStyles.device,
    targetPosition: Position.Top,
  },
  {
    id: 'device-camera',
    data: {
      label: (
        <div>
          <div>device: camera</div>
          <div>versions: 5.10, 5.11, 3.2</div>
          <div>58 devices reporting</div>
        </div>
      ),
    },
    position: { x: 550, y: 350 },
    style: nodeStyles.device,
    targetPosition: Position.Top,
  },
];

// Initial edges
const initialEdges: Edge[] = [
  {
    id: 'ios-to-ingress',
    source: 'ios-myapp',
    target: 'ingress-myapp',
    animated: true,
  },
  {
    id: 'sensor-eu-to-ingress',
    source: 'device-sensor-eu',
    target: 'ingress-myapp',
    animated: true,
  },
  {
    id: 'ingress-to-db',
    source: 'ingress-myapp',
    target: 'db-myapp',
    animated: true,
  },
  {
    id: 'ingress-to-chicago',
    source: 'ingress-myapp',
    target: 'chicago-office',
    animated: true,
  },
  {
    id: 'sensor-na-to-ingress',
    source: 'device-sensor-na',
    target: 'ingress-myapp',
    animated: true,
  },
  {
    id: 'camera-to-chicago',
    source: 'device-camera',
    target: 'chicago-office',
    animated: true,
  },
];

export default function ComplianceGraph() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onInit = useCallback((reactFlowInstance: any) => {
    reactFlowInstance.fitView();
  }, []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onInit={onInit}
      fitView
      attributionPosition="bottom-right"
    >
      <Controls />
      <Background color="#e0e0e0" gap={16} />
    </ReactFlow>
  );
}
