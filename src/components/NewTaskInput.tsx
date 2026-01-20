import React, { useState } from 'react';
import { Plus, Circle, Calendar, Clock } from 'lucide-react';

interface NewTaskInputProps {
  showNewTask: boolean;
  newTaskText: string;
  onTextChange: (text: string) => void;
  onShowChange: (show: boolean) => void;
  onAddTask: (text: string, dueDate?: string, reminderMinutes?: number) => void;
}

const NewTaskInput: React.FC<NewTaskInputProps> = ({
  showNewTask,
  newTaskText,
  onTextChange,
  onShowChange,
  onAddTask
}) => {
  // デフォルトで今日の現在時刻を設定
  const getDefaultDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };
  
  const [dueDate, setDueDate] = useState<string>(getDefaultDateTime());
  const [reminderMinutes, setReminderMinutes] = useState<number>(0);
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleAddTask = () => {
    if (newTaskText.trim()) {
      // datetime-localの値をJST（日本時間）としてISO文字列に変換
      const dueDateISO = dueDate ? new Date(dueDate).toISOString() : undefined;
      
      onAddTask(
        newTaskText,
        dueDateISO,
        reminderMinutes > 0 ? reminderMinutes : undefined
      );
      setDueDate(getDefaultDateTime());
      setReminderMinutes(0);
      setShowOptions(false);
    }
  };

  const handleCancel = () => {
    onShowChange(false);
    onTextChange('');
    setDueDate(getDefaultDateTime());
    setReminderMinutes(0);
    setShowOptions(false);
  };

  return (
    <div style={{
      borderTop: '1px solid #E5E7EB',
      padding: '16px'
    }}>
      {showNewTask ? (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <Circle size={20} color="#9CA3AF" />
            <input
              type="text"
              autoFocus
              placeholder="新しいタスク..."
              value={newTaskText}
              onChange={(e) => onTextChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  handleCancel();
                }
              }}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: '14px'
              }}
            />
            <button
              onClick={() => setShowOptions(!showOptions)}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                padding: '4px',
                display: 'flex',
                alignItems: 'center'
              }}
              title="オプション"
            >
              <Calendar size={18} color="#6B7280" />
            </button>
          </div>
          {showOptions && (
            <div style={{
              marginLeft: '28px',
              marginTop: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              padding: '12px',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={16} color="#6B7280" />
                <input
                  type="datetime-local"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    fontSize: '12px',
                    outline: 'none'
                  }}
                />
              </div>
              {dueDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={16} color="#6B7280" />
                  <select
                    value={reminderMinutes}
                    onChange={(e) => setReminderMinutes(Number(e.target.value))}
                    style={{
                      flex: 1,
                      padding: '6px',
                      border: '1px solid #D1D5DB',
                      borderRadius: '4px',
                      fontSize: '12px',
                      outline: 'none'
                    }}
                  >
                    <option value="0">リマインダーなし</option>
                    <option value="5">5分前</option>
                    <option value="10">10分前</option>
                    <option value="15">15分前</option>
                    <option value="30">30分前</option>
                    <option value="60">1時間前</option>
                    <option value="120">2時間前</option>
                  </select>
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <button
                  onClick={handleAddTask}
                  style={{
                    flex: 1,
                    padding: '6px 12px',
                    backgroundColor: '#3B82F6',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                    fontWeight: 500
                  }}
                >
                  追加
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    padding: '6px 12px',
                    backgroundColor: 'white',
                    color: '#6B7280',
                    border: '1px solid #D1D5DB',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  キャンセル
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => onShowChange(true)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: '#3B82F6',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            padding: 0
          }}
        >
          <Plus size={20} />
          <span style={{ fontSize: '14px', fontWeight: 500 }}>新規</span>
        </button>
      )}
    </div>
  );
};

export default NewTaskInput;

