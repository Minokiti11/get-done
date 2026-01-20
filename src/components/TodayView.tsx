import React from 'react';
import { Task } from '../utils/types';
import TaskItem from './TaskItem';

interface TodayViewProps {
  todayTasks: Task[];
  allTasks: Task[];
  onToggle: (taskId: number) => void;
  onRemoveFromToday: (taskId: number) => void;
  onAddToToday: (task: Task) => void;
}

const TodayView: React.FC<TodayViewProps> = ({
  todayTasks,
  allTasks,
  onToggle,
  onRemoveFromToday,
  onAddToToday,
}) => {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskData = e.dataTransfer.getData('task');
    if (taskData) {
      const task = JSON.parse(taskData);
      onAddToToday(task);
    }
  };

  const handleDragStart = (task: Task, e: React.DragEvent) => {
    e.dataTransfer.setData('task', JSON.stringify(task));
  };

  const canAddMore = todayTasks.length < 3;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* 今日のタスクセクション */}
      <div
        onDragOver={canAddMore ? handleDragOver : undefined}
        onDragLeave={handleDragLeave}
        onDrop={canAddMore ? handleDrop : undefined}
        style={{
          padding: '16px',
          borderBottom: '2px solid #E5E7EB',
          backgroundColor: isDragOver ? '#EFF6FF' : '#F9FAFB',
          border: isDragOver ? '2px dashed #3B82F6' : 'none',
          borderRadius: isDragOver ? '8px' : '0',
          transition: 'all 0.2s',
          minHeight: '200px',
        }}
      >
        <h2 style={{
          fontSize: '18px',
          fontWeight: '600',
          marginBottom: '16px',
          color: '#1F2937',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          ⭐ 今日のタスク
          <span style={{
            fontSize: '12px',
            color: '#6B7280',
            fontWeight: '400'
          }}>
            ({todayTasks.length}/3)
          </span>
        </h2>

        {todayTasks.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '120px',
            color: '#9CA3AF',
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '2px dashed #D1D5DB'
          }}>
            <p style={{ fontSize: '16px', marginBottom: '8px' }}>
              下のリストからタスクをドラッグ
            </p>
            <p style={{ fontSize: '14px' }}>最大3個まで選択できます</p>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #E5E7EB'
          }}>
            {todayTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={onToggle}
                onDelete={onRemoveFromToday}
                isDraggable={false}
              />
            ))}
          </div>
        )}

        {!canAddMore && (
          <div style={{
            marginTop: '12px',
            padding: '8px 12px',
            backgroundColor: '#FEF3C7',
            color: '#92400E',
            borderRadius: '6px',
            fontSize: '14px',
            textAlign: 'center'
          }}>
            今日のタスクは最大3個までです
          </div>
        )}
      </div>

      {/* すべてのタスクリスト */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px'
      }}>
        <h3 style={{
          fontSize: '14px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#6B7280',
          textTransform: 'uppercase',
          letterSpacing: '0.05em'
        }}>
          すべてのタスク
        </h3>

        {allTasks.length === 0 ? (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: '#9CA3AF'
          }}>
            <p style={{ fontSize: '16px' }}>タスクがありません</p>
          </div>
        ) : (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
            overflow: 'hidden'
          }}>
            {allTasks.map(task => {
              const taskDragStart = (e: React.DragEvent) => {
                e.dataTransfer.setData('task', JSON.stringify(task));
              };
              
              return (
                <div
                  key={task.id}
                  draggable
                  onDragStart={taskDragStart}
                  style={{ cursor: 'grab' }}
                >
                  <TaskItem
                    task={task}
                    onToggle={onToggle}
                    onDelete={() => {}}
                    isDraggable={false}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayView;
