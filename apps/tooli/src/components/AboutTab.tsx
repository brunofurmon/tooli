import React from 'react';
import { Card } from './ui/Card';

export const AboutTab: React.FC = () => {
  return (
    <div className="about-tab space-y-6">
      <Card>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎯 About Tooli
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-4">
          Tooli is a comprehensive platform designed specifically for software
          engineering teams to enhance their day-to-day productivity and
          collaboration. We provide a suite of interactive tools that make
          development workflows more engaging and efficient.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Our platform is built with modern web technologies and follows best
          practices for scalability, maintainability, and user experience. Each
          tool is carefully crafted to integrate seamlessly into your existing
          development processes.
        </p>
      </Card>

      <Card>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          🛠️ Available Tools
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <h4 className="text-xl font-semibold text-green-800 mb-3">
              🎮 Spinning Wheel
            </h4>
            <p className="text-green-700 mb-4">
              Interactive decision-making tool for team activities, random
              selections, and fun team building exercises.
            </p>
            <span className="inline-block bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Available Now
            </span>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
            <h4 className="text-xl font-semibold text-yellow-800 mb-3">
              🃏 Scrum Poker
            </h4>
            <p className="text-yellow-700 mb-4">
              Agile estimation tool for story point voting and team consensus
              building during sprint planning.
            </p>
            <span className="inline-block bg-yellow-200 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
            <h4 className="text-xl font-semibold text-blue-800 mb-3">
              📊 Dev Productivity Tools
            </h4>
            <p className="text-blue-700 mb-4">
              Suite of productivity tools including time tracking, task
              management, and team analytics.
            </p>
            <span className="inline-block bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Coming Soon
            </span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🛠️ Built with</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <div className="text-2xl mb-2">⚛️</div>
            <span className="font-medium text-gray-700">React 19</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <div className="text-2xl mb-2">▲</div>
            <span className="font-medium text-gray-700">Next.js 15</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <div className="text-2xl mb-2">📘</div>
            <span className="font-medium text-gray-700">TypeScript</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <div className="text-2xl mb-2">🔧</div>
            <span className="font-medium text-gray-700">Nx Monorepo</span>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center border border-gray-200">
            <div className="text-2xl mb-2">🎨</div>
            <span className="font-medium text-gray-700">Tailwind CSS</span>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          🏗️ Architecture
        </h3>
        <p className="text-lg text-gray-700 mb-4">
          Tooli uses a modern monorepo architecture powered by Nx, providing:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">Scalability</h4>
            <p className="text-blue-700">Easy to add new tools and features</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">
              Maintainability
            </h4>
            <p className="text-green-700">
              Shared libraries and consistent patterns
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">Performance</h4>
            <p className="text-purple-700">
              Optimized builds and efficient caching
            </p>
          </div>
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">
              Developer Experience
            </h4>
            <p className="text-orange-700">
              Hot reloading, type safety, and comprehensive tooling
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">🗺️ Roadmap</h3>
        <div className="space-y-6">
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Phase 1: Foundation
              </h4>
              <p className="text-gray-600">
                Spinning Wheel tool with basic functionality
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Phase 2: Agile Tools
              </h4>
              <p className="text-gray-600">Scrum Poker and estimation tools</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-6 h-6 bg-gray-400 rounded-full flex-shrink-0 mt-1"></div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Phase 3: Productivity Suite
              </h4>
              <p className="text-gray-600">
                Advanced productivity and analytics tools
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
