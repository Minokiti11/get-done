import React from 'react';
import { Search, LogOut, Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  user?: any;
  onLogout?: () => void;
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, searchQuery, onSearchChange, user, onLogout, onMenuClick }) => {
  return (
    <div style={{
      borderBottom: '1px solid #E5E7EB',
      padding: '16px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '16px',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          {onMenuClick && (
            <button
              onClick={onMenuClick}
              style={{
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                padding: '4px',
                display: 'none',
                alignItems: 'center'
              }}
              className="menu-button"
            >
              <Menu size={24} color="#374151" />
            </button>
          )}
          <h2 style={{ 
            fontSize: '24px', 
            fontWeight: 'bold',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0
          }}>{title}</h2>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} className="user-info">
              <span style={{ fontSize: '14px', color: '#6B7280' }}>
                {user.email}
              </span>
              {onLogout && (
                <button
                  onClick={() => {
                    if (window.confirm("本当にログアウトしますか？")) {
                      onLogout();
                    }
                  }}
                  style={{
                    border: 'none',
                    backgroundColor: 'transparent',
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title="ログアウト"
                >
                  <LogOut size={18} color="#6B7280" />
                </button>
              )}
            </div>
          )}
          <div style={{ position: 'relative' }} className="search-box">
            <Search size={16} style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF'
            }} />
            <input
              type="text"
              placeholder="検索..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                paddingLeft: '40px',
                paddingRight: '16px',
                paddingTop: '8px',
                paddingBottom: '8px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                width: '200px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

