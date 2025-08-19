'use client';

import React, { useEffect } from 'react';
import { Navigation } from '../../components/Navigation';
import { Card, CardHeader, CardBody } from '@heroui/react';

export default function AboutPage() {
  // Set page title
  useEffect(() => {
    document.title = 'Tooli - About';
  }, []);
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--nextui-colors-background)',
      }}
    >
      <Navigation />

      <main
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '32px 16px',
        }}
      >
        <div style={{ marginBottom: '48px' }}>
          <h2
            style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: 'var(--nextui-colors-foreground)',
              margin: '0 0 16px 0',
            }}
          >
            🎯 About Tooli
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.8,
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            Tooli is a comprehensive platform designed to enhance team
            decision-making and collaboration. Our tools help teams make better
            decisions faster, from simple random selections to complex voting
            systems.
          </p>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.8,
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Built with modern web technologies and designed for seamless team
            collaboration.
          </p>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--nextui-colors-foreground)',
              margin: '0 0 16px 0',
            }}
          >
            🚀 Features
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            <Card>
              <CardHeader>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--nextui-colors-foreground)',
                    margin: 0,
                  }}
                >
                  🎲 Spinning Wheel
                </h4>
              </CardHeader>
              <CardBody>
                <p
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  Interactive spinning wheel with customizable segments and
                  weighted probabilities
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--nextui-colors-foreground)',
                    margin: 0,
                  }}
                >
                  👥 User Management
                </h4>
              </CardHeader>
              <CardBody>
                <p
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  Add, edit, and manage participants with custom weights and
                  participation settings
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--nextui-colors-foreground)',
                    margin: 0,
                  }}
                >
                  📊 Analytics
                </h4>
              </CardHeader>
              <CardBody>
                <p
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  Track spin history, win rates, and user participation
                  statistics
                </p>
              </CardBody>
            </Card>
          </div>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--nextui-colors-foreground)',
              margin: '0 0 16px 0',
            }}
          >
            🛠️ Technology Stack
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px',
            }}
          >
            <Card>
              <CardBody style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>⚛️</div>
                <span
                  style={{
                    fontWeight: '500',
                    color: 'var(--nextui-colors-foreground)',
                  }}
                >
                  React 19
                </span>
              </CardBody>
            </Card>

            <Card>
              <CardBody style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>▲</div>
                <span
                  style={{
                    fontWeight: '500',
                    color: 'var(--nextui-colors-foreground)',
                  }}
                >
                  Next.js 15
                </span>
              </CardBody>
            </Card>

            <Card>
              <CardBody style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>📘</div>
                <span
                  style={{
                    fontWeight: '500',
                    color: 'var(--nextui-colors-foreground)',
                  }}
                >
                  TypeScript
                </span>
              </CardBody>
            </Card>

            <Card>
              <CardBody style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔧</div>
                <span
                  style={{
                    fontWeight: '500',
                    color: 'var(--nextui-colors-foreground)',
                  }}
                >
                  Nx Monorepo
                </span>
              </CardBody>
            </Card>

            <Card>
              <CardBody style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🎨</div>
                <span
                  style={{
                    fontWeight: '500',
                    color: 'var(--nextui-colors-foreground)',
                  }}
                >
                  HeroUI
                </span>
              </CardBody>
            </Card>
          </div>
        </div>

        <div style={{ marginBottom: '48px' }}>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--nextui-colors-foreground)',
              margin: '0 0 16px 0',
            }}
          >
            🎯 Why Tooli?
          </h3>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.8,
              lineHeight: '1.6',
              margin: '0 0 16px 0',
            }}
          >
            Tooli was created to solve common team decision-making challenges.
            Whether you need to randomly select a team member, make fair
            decisions, or track participation, Tooli provides the tools you
            need.
          </p>
          <p
            style={{
              fontSize: '18px',
              color: 'var(--nextui-colors-foreground)',
              opacity: 0.8,
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Our platform is designed to be simple, fast, and reliable for teams
            of any size.
          </p>
        </div>

        <div>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'var(--nextui-colors-foreground)',
              margin: '0 0 16px 0',
            }}
          >
            🗺️ Roadmap
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px',
            }}
          >
            <Card>
              <CardHeader>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--nextui-colors-foreground)',
                    margin: 0,
                  }}
                >
                  🎲 Advanced Spinning Wheels
                </h4>
              </CardHeader>
              <CardBody>
                <p
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  Multiple wheel types, custom themes, and advanced probability
                  settings
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--nextui-colors-foreground)',
                    margin: 0,
                  }}
                >
                  🃏 Scrum Poker
                </h4>
              </CardHeader>
              <CardBody>
                <p
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  Story point estimation and team voting tools for agile
                  development
                </p>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h4
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'var(--nextui-colors-foreground)',
                    margin: 0,
                  }}
                >
                  📈 Team Analytics
                </h4>
              </CardHeader>
              <CardBody>
                <p
                  style={{
                    color: 'var(--nextui-colors-foreground)',
                    opacity: 0.8,
                    margin: 0,
                  }}
                >
                  Comprehensive team performance metrics and decision tracking
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
