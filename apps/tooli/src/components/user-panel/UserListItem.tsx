'use client';

import React, { useState } from 'react';
import { Checkbox, Input, Button } from '@heroui/react';
import { User, UserManager } from '@tooli/user-management';

interface UserListItemProps {
  user: User;
  userManager: UserManager;
  onUserUpdated?: () => void;
}

export const UserListItem: React.FC<UserListItemProps> = ({
  user,
  userManager,
  onUserUpdated,
}) => {
  const [weightValue, setWeightValue] = useState(
    user.customWeight?.toString() || ''
  );
  const [nameValue, setNameValue] = useState(user.name);
  const [isEditingWeight, setIsEditingWeight] = useState(false);

  const handleToggleParticipation = () => {
    userManager.toggleUserParticipation(user.id);
    onUserUpdated?.();
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeightValue(e.target.value);
  };

  const handleWeightFocus = () => {
    setIsEditingWeight(true);
    setWeightValue(userManager.getCalculatedWeight(user.id).toFixed(1));
  };

  const handleWeightBlur = () => {
    setIsEditingWeight(false);
    const weight = parseFloat(weightValue);
    if (!isNaN(weight) && weight >= 0 && weight <= 100) {
      userManager.updateUserWeight(user.id, weight);
      onUserUpdated?.();
    } else {
      setWeightValue(user.customWeight?.toString() || '');
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handleNameKeyUp = () => {
    if (nameValue.trim() && nameValue !== user.name) {
      userManager.updateUserName(user.id, nameValue.trim());
      onUserUpdated?.();
    }
  };

  const handleRemoveUser = () => {
    userManager.removeUser(user.id);
    onUserUpdated?.();
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px',
        borderBottom: '1px solid var(--nextui-colors-divider)',
        transition: 'background-color 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor =
          'var(--nextui-colors-default50)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flex: 1,
        }}
      >
        <Checkbox
          isSelected={user.isChecked}
          onValueChange={handleToggleParticipation}
          color="primary"
          size="sm"
        />

        <div style={{ flex: 1, minWidth: 0 }}>
          <Input
            value={nameValue}
            onChange={handleNameChange}
            onKeyUp={handleNameKeyUp}
            size="sm"
            style={{ flex: 1 }}
            placeholder="User name"
            maxLength={255}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Input
            type="number"
            size="sm"
            placeholder="Weight"
            value={
              isEditingWeight
                ? weightValue
                : userManager.getCalculatedWeight(user.id).toFixed(1)
            }
            onChange={handleWeightChange}
            onFocus={handleWeightFocus}
            onBlur={handleWeightBlur}
            style={{ width: '80px' }}
            min={0}
            max={100}
            step={0.1}
          />
          <span
            style={{
              fontSize: '12px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.5,
            }}
          >
            %
          </span>
        </div>

        <button
          onClick={handleRemoveUser}
          style={{
            background: 'none',
            border: 'none',
            color: '#ef4444',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '4px',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          title="Remove user"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
