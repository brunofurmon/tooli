import React from 'react';
import {
  Card as NextUICard,
  CardHeader,
  CardBody,
  CardFooter,
} from '@heroui/react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  header,
  footer,
}) => {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <NextUICard className={`${paddingClasses[padding]} ${className}`}>
      {header && <CardHeader>{header}</CardHeader>}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </NextUICard>
  );
};
