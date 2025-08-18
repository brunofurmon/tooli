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
              <h4
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'var(--nextui-colors-foreground)',
                  margin: '0 0 8px 0',
                  opacity: 0.8,
                }}
              >
                Active Users ({activeUsers.length})
              </h4>
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
        </div>
      </CardBody>
    </Card>
  );
};
