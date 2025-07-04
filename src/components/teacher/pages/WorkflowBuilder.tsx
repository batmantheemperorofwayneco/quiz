import React, { useState, useRef } from 'react';
import { 
  Save, 
  Play, 
  Rocket, 
  ZoomIn, 
  ZoomOut, 
  Maximize,
  Calendar,
  CheckCircle,
  Hand,
  Send,
  Bell,
  Target,
  Award,
  GitFork,
  GitPullRequest,
  Clock,
  Plus,
  X,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'control';
  subtype: string;
  x: number;
  y: number;
  config: any;
  connections: string[];
}

interface Connection {
  from: string;
  to: string;
  fromPort: string;
  toPort: string;
}

const WorkflowBuilder: React.FC = () => {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [nodes, setNodes] = useState<WorkflowNode[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedNodeType, setDraggedNodeType] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'monthly' | 'yearly' | 'timeline'>('monthly');
  const [workflowName, setWorkflowName] = useState('Untitled Workflow');

  const nodeTypes = {
    triggers: [
      { type: 'date-time', label: 'Date & Time', icon: Calendar, description: 'Start flow on specific date' },
      { type: 'assignment-completion', label: 'Assignment Complete', icon: CheckCircle, description: 'Trigger when assignment completed' },
      { type: 'manual-unlock', label: 'Manual Unlock', icon: Hand, description: 'Require teacher intervention' }
    ],
    actions: [
      { type: 'release-assignment', label: 'Release Assignment', icon: Send, description: 'Make assignment visible' },
      { type: 'send-notification', label: 'Send Notification', icon: Bell, description: 'Send automated message' },
      { type: 'assign-remediation', label: 'Assign Remediation', icon: Target, description: 'Assign remedial tasks' }
    ],
    conditions: [
      { type: 'score-threshold', label: 'Score Threshold', icon: Award, description: 'Branch based on score' },
      { type: 'all-completed', label: 'All Completed', icon: GitFork, description: 'All paths must be true' },
      { type: 'any-completed', label: 'Any Completed', icon: GitPullRequest, description: 'At least one path true' }
    ],
    control: [
      { type: 'delay', label: 'Delay', icon: Clock, description: 'Pause flow for duration' }
    ]
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedNodeType || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;

    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: draggedNodeType.split('-')[0] as any,
      subtype: draggedNodeType,
      x,
      y,
      config: {},
      connections: []
    };

    setNodes(prev => [...prev, newNode]);
    setDraggedNodeType(null);
  };

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
  };

  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  const getNodeIcon = (subtype: string) => {
    const allTypes = [...nodeTypes.triggers, ...nodeTypes.actions, ...nodeTypes.conditions, ...nodeTypes.control];
    const nodeType = allTypes.find(t => t.type === subtype);
    return nodeType?.icon || Calendar;
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger': return 'bg-green-100 border-green-300 text-green-800';
      case 'action': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'condition': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'control': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const selectedNodeData = selectedNode ? nodes.find(n => n.id === selectedNode) : null;

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/assignments')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <input
              type="text"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-xl font-bold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
            />
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={viewMode}
              onChange={(e) => setViewMode(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="monthly">Monthly View</option>
              <option value="yearly">Yearly View</option>
              <option value="timeline">Timeline View</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
              <Save className="w-4 h-4" />
              Save Draft
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
              <Play className="w-4 h-4" />
              Test Workflow
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Rocket className="w-4 h-4" />
              Publish
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Node Palette */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <h3 className="font-semibold text-gray-900 mb-4">Workflow Components</h3>
          
          {Object.entries(nodeTypes).map(([category, types]) => (
            <div key={category} className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2 capitalize">{category}</h4>
              <div className="space-y-2">
                {types.map((nodeType) => {
                  const Icon = nodeType.icon;
                  return (
                    <div
                      key={nodeType.type}
                      draggable
                      onDragStart={() => setDraggedNodeType(nodeType.type)}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-move hover:bg-gray-50 hover:border-blue-300"
                    >
                      <Icon className="w-5 h-5 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{nodeType.label}</p>
                        <p className="text-xs text-gray-500">{nodeType.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="flex-1 relative overflow-hidden">
          {/* Canvas Controls */}
          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button
              onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom(1)}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Maximize className="w-4 h-4" />
            </button>
          </div>

          {/* Canvas Area */}
          <div
            ref={canvasRef}
            className="w-full h-full bg-gray-100 relative overflow-auto"
            style={{
              backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              transform: `scale(${zoom})`,
              transformOrigin: 'top left'
            }}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            {/* Render Nodes */}
            {nodes.map((node) => {
              const Icon = getNodeIcon(node.subtype);
              return (
                <div
                  key={node.id}
                  className={`absolute w-40 p-3 border-2 rounded-lg cursor-pointer ${getNodeColor(node.type)} ${
                    selectedNode === node.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ left: node.x, top: node.y }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{node.subtype.replace('-', ' ')}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNode(node.id);
                      }}
                      className="ml-auto text-red-500 hover:text-red-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {/* Connection Points */}
                  <div className="absolute -right-2 top-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2"></div>
                  <div className="absolute -left-2 top-1/2 w-4 h-4 bg-white border-2 border-gray-400 rounded-full transform -translate-y-1/2"></div>
                </div>
              );
            })}

            {/* Empty State */}
            {nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gray-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <GitFork className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Building Your Workflow</h3>
                  <p className="text-gray-600 mb-4">Drag components from the left panel to create your assignment workflow</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Configuration Panel */}
        {selectedNodeData && (
          <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Configure Node</h3>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Node Type</label>
                <p className="text-sm text-gray-600 capitalize">{selectedNodeData.subtype.replace('-', ' ')}</p>
              </div>

              {selectedNodeData.subtype === 'date-time' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    />
                  </div>
                </>
              )}

              {selectedNodeData.subtype === 'assignment-completion' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="">Select assignment</option>
                    <option value="1">Linear Equations Practice</option>
                    <option value="2">Quadratic Functions Review</option>
                  </select>
                </div>
              )}

              {selectedNodeData.subtype === 'release-assignment' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment to Release</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                    <option value="">Select assignment</option>
                    <option value="1">Draft Assignment 1</option>
                    <option value="2">Draft Assignment 2</option>
                  </select>
                </div>
              )}

              {selectedNodeData.subtype === 'send-notification' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={3}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="Enter notification message..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option value="class">Entire Class</option>
                      <option value="specific">Specific Students</option>
                    </select>
                  </div>
                </>
              )}

              {selectedNodeData.subtype === 'score-threshold' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Condition</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option value="greater">Score greater than</option>
                      <option value="less">Score less than</option>
                      <option value="equal">Score equal to</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Threshold (%)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="80"
                    />
                  </div>
                </>
              )}

              {selectedNodeData.subtype === 'delay' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                    </select>
                  </div>
                </>
              )}

              <div className="pt-4 border-t border-gray-200">
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                  Apply Configuration
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowBuilder;