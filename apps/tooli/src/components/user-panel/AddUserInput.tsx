'use client';

import React, { useState } from 'react';
import { Input, Spinner } from '@heroui/react';
import { UserManager } from '@tooli/user-management';

interface AddUserInputProps {
  userManager: UserManager;
  onUserAdded?: () => void;
}

export const AddUserInput: React.FC<AddUserInputProps> = ({
  userManager,
  onUserAdded,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      await addUser();
    }
  };

  const addUser = async () => {
    const trimmedValue = inputValue.trim();

    if (!trimmedValue) {
      setError('Name cannot be empty');
      return;
    }

    if (userManager.getUserCount() >= 100) {
      setError('Maximum 100 users allowed');
      return;
    }

    if (trimmedValue.length > 255) {
      setError('Name too long (max 255 characters)');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      userManager.addUser(trimmedValue);
      setInputValue('');
      onUserAdded?.();
    } catch (err) {
      setError('Failed to add user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ marginBottom: '16px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={handleKeyUp}
          placeholder="Type user name and press Enter or Space"
          size="sm"
          style={{ flex: 1 }}
          maxLength={255}
          isDisabled={isLoading}
        />
        {isLoading && <Spinner size="sm" />}
      </div>

      {error && (
        <div
          style={{
            color: 'var(--nextui-colors-danger)',
            fontSize: '12px',
            marginTop: '4px',
          }}
        >
          {error}
        </div>
      )}

      <div
        style={{
          fontSize: '12px',
          color: 'var(--nextui-colors-foreground)',
          opacity: 0.6,
          marginTop: '4px',
        }}
      >
        Press Enter or Space to add • Max 100 users • 255 characters
      </div>
    </div>
  );
};
