'use client';

import React from 'react';
import { Button as HeroUIButton } from '@heroui/react';

interface ButtonProps {
  children: React.ReactNode;
  variant?:
    | 'light'
    | 'solid'
    | 'bordered'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'default';
  onClick?: () => void;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'solid',
  size = 'md',
  color = 'primary',
  onClick,
  onPress,
  className = '',
  disabled = false,
  isLoading = false,
  fullWidth = false,
  startContent,
  endContent,
  ...props
}) => {
  return (
    <HeroUIButton
      variant={variant}
      size={size}
      color={color}
      onPress={onPress || onClick}
      className={className}
      isDisabled={disabled}
      isLoading={isLoading}
      fullWidth={fullWidth}
      startContent={startContent}
      endContent={endContent}
      {...props}
    >
      {children}
    </HeroUIButton>
  );
};
