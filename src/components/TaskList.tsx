import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Task } from '../utils/types';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  isDraggable?: boolean;
  onDragStart?: (task: Task) => void;
  isDroppable?: boolean;
  onDrop?: (task: Task) => void;
  maxItems?: number;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onToggle, 
  onDelete, 
  isDraggable,
  onDragStart,
  isDroppable,
  onDrop,
  maxItems
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    if (isDroppable) {
      e.preventDefault();
      setIsDragOver(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskData = e.dataTransfer.getData('task');
    if (taskData && onDrop) {
      const task = JSON.parse(taskData);
      onDrop(task);
    }
  };

  const handleTaskDragStart = (task: Task) => {
    if (onDragStart) {
      onDragStart(task);
    }
  };

  if (tasks.length === 0 && !isDroppable) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        color: '#9CA3AF'
      }}>
        <CheckCircle2 size={64} style={{ marginBottom: '16px' }} />
        <p style={{ fontSize: '18px' }}>タスクがありません</p>
      </div>
    );
  }

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      style={{
        minHeight: isDroppable ? '200px' : 'auto',
        border: isDragOver ? '2px dashed #3B82F6' : 'none',
        borderRadius: '8px',
        backgroundColor: isDragOver ? '#EFF6FF' : 'transparent',
        transition: 'all 0.2s'
      }}
    >
      {isDroppable && tasks.length === 0 && (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          color: '#9CA3AF'
        }}>
          <p style={{ fontSize: '16px' }}>タスクをここにドラッグ</p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            {maxItems ? `最大${maxItems}個まで` : ''}
          </p>
        </div>
      )}
      {isDroppable && maxItems && tasks.length >= maxItems && (
        <div style={{
          padding: '12px 16px',
          backgroundColor: '#FEF3C7',
          color: '#92400E',
          borderRadius: '8px',
          marginBottom: '12px',
          fontSize: '14px'
        }}>
          今日のタスクは最大{maxItems}個までです
        </div>
      )}
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          isDraggable={isDraggable}
          onDragStart={handleTaskDragStart}
        />
      ))}
    </div>
  );
};

export default TaskList;

