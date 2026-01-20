import React from 'react';
import { CheckCircle2, Circle, Trash2, Calendar } from 'lucide-react';
import { Task } from '../utils/types';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: number) => void;
  onDelete: (taskId: number) => void;
  isDraggable?: boolean;
  onDragStart?: (task: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete, isDraggable, onDragStart }) => {
  // 日時をフォーマットする関数（日本時間で表示）
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  const handleDragStart = (e: React.DragEvent) => {
    if (isDraggable && onDragStart) {
      e.dataTransfer.setData('task', JSON.stringify(task));
      onDragStart(task);
    }
  };

  return (
    <div
      draggable={isDraggable}
      onDragStart={handleDragStart}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderBottom: '1px solid #F3F4F6',
        cursor: isDraggable ? 'grab' : 'default'
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
    >
      <button
        onClick={() => onToggle(task.id)}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          padding: 0,
          display: 'flex'
        }}
      >
        {task.completed ? (
          <CheckCircle2 size={20} color="#3B82F6" />
        ) : (
          <Circle size={20} color="#9CA3AF" />
        )}
      </button>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '14px',
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#9CA3AF' : '#111827',
          marginBottom: task.dueDate ? '4px' : '0'
        }}>
          {task.text}
        </p>
        {task.dueDate && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '12px',
            color: '#6B7280'
          }}>
            <Calendar size={12} />
            <span>{formatDateTime(task.dueDate)}</span>
          </div>
        )}
      </div>

      <button
        onClick={() => onDelete(task.id)}
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          padding: 0,
          display: 'flex'
        }}
      >
        <Trash2 size={16} color="#9CA3AF" />
      </button>
    </div>
  );
};

export default TaskItem;

