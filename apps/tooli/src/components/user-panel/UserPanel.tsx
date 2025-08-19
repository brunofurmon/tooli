'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody } from '@heroui/react';
import { UserManager, User } from '@tooli/user-management';
import { AddUserInput } from './AddUserInput';
import { UserListItem } from './UserListItem';

interface UserPanelProps {
  userManager: UserManager;
  onUsersChanged?: () => void;
}

export const UserPanel: React.FC<UserPanelProps> = ({
  userManager,
  onUsersChanged,
}) => {
  const [users, setUsers] = useState<User[]>([]);

  const handleExportUsers = () => {
    const data = userManager.exportToJSON();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tooli-users-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportUsers = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          userManager.importFromJSON(data);
          onUsersChanged?.();
        } catch (error) {
          console.error('Error importing users:', error);
          alert('Error importing users. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    const updateUsers = () => {
      setUsers(userManager.getAllUsers());
    };

    updateUsers();
    const unsubscribe = userManager.subscribe(updateUsers);
    return unsubscribe;
  }, [userManager]);

  const activeUsers = users.filter((user) => user.isChecked);
  const inactiveUsers = users.filter((user) => !user.isChecked);

  return (
    <Card style={{ width: '100%', maxWidth: '400px' }}>
      <CardHeader>
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: 'var(--nextui-colors-foreground)',
            margin: 0,
          }}
        >
          👥 User Management
        </h3>
      </CardHeader>
      <CardBody>
        <AddUserInput userManager={userManager} onUserAdded={onUsersChanged} />

        <div style={{ marginTop: '16px' }}>
          {/* Active Users */}
          {activeUsers.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h4
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--nextui-colors-foreground)',
                    margin: 0,
                    opacity: 0.8,
                  }}
                >
                  Active Users ({activeUsers.length})
                </h4>
                <button
                  onClick={() => {
                    // Normalize all active users to equal distribution
                    activeUsers.forEach(user => {
                      userManager.updateUserWeight(user.id, 0); // Reset to equal distribution
                    });
                    onUsersChanged?.();
                  }}
                  style={{
                    fontSize: '12px',
                    padding: '6px 12px',
                    backgroundColor: 'var(--nextui-colors-secondary)',
                    color: 'var(--nextui-colors-secondaryForeground)',
                    border: '1px solid var(--nextui-colors-secondaryBorder)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Normalize
                </button>
              </div>
              {activeUsers.map((user) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  userManager={userManager}
                  onUserUpdated={onUsersChanged}
                />
              ))}
            </div>
          )}

          {/* Inactive Users */}
          {inactiveUsers.length > 0 && (
            <div>
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--nextui-colors-foreground)',
                  margin: '0 0 8px 0',
                  opacity: 0.6,
                }}
              >
                Inactive Users ({inactiveUsers.length})
              </h4>
              {inactiveUsers.map((user) => (
                <UserListItem
                  key={user.id}
                  user={user}
                  userManager={userManager}
                  onUserUpdated={onUsersChanged}
                />
              ))}
            </div>
          )}

          {users.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding: '24px',
                color: 'var(--nextui-colors-foreground)',
                opacity: 0.6,
              }}
            >
              No users added yet. Add your first user above!
            </div>
          )}

          {/* Export/Import Section */}
          {users.length > 0 && (
            <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--nextui-colors-divider)' }}>
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--nextui-colors-foreground)',
                  margin: '0 0 12px 0',
                  opacity: 0.8,
                }}
              >
                Data Management
              </h4>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <button
                  onClick={handleExportUsers}
                  style={{
                    fontSize: '12px',
                    padding: '6px 12px',
                    backgroundColor: 'var(--nextui-colors-secondary)',
                    color: 'var(--nextui-colors-secondaryForeground)',
                    border: '1px solid var(--nextui-colors-secondaryBorder)',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  📤 Export Users
                </button>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportUsers}
                    style={{
                      fontSize: '12px',
                      flex: 1,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '12px',
                      color: 'var(--nextui-colors-foreground)',
                      opacity: 0.7,
                    }}
                  >
                    Import
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};
