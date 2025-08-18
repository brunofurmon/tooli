import { SpinningWheel } from '../components/SpinningWheel';
import styles from './page.module.css';

export default function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span>🎯 Welcome to </span>
              Tooli - Spinning Wheel Platform
            </h1>
            <p>Try your luck with our interactive spinning wheel!</p>
          </div>

          <div id="wheel-section" className="rounded shadow">
            <h2>🎮 Interactive Spinning Wheel</h2>
            <SpinningWheel size={350} />
          </div>

          <div id="features" className="rounded shadow">
            <h2>✨ Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🎯 Interactive</h3>
                <p>Click to spin and watch the wheel in action</p>
              </div>
              <div className="feature-card">
                <h3>🎨 Beautiful Design</h3>
                <p>Smooth animations and modern UI</p>
              </div>
              <div className="feature-card">
                <h3>🎁 Multiple Prizes</h3>
                <p>Different prizes with varying probabilities</p>
              </div>
              <div className="feature-card">
                <h3>📱 Responsive</h3>
                <p>Works perfectly on all devices</p>
              </div>
            </div>
          </div>

          <div id="info" className="rounded shadow">
            <h2>ℹ️ About Tooli</h2>
            <p>
              Tooli is an interactive platform featuring a spinning wheel
              component, built with modern web technologies including React,
              Next.js, and TypeScript. The project uses a monorepo structure
              powered by Nx for scalable development.
            </p>
            <div className="tech-stack">
              <h3>🛠️ Built with:</h3>
              <ul>
                <li>React 19</li>
                <li>Next.js 15</li>
                <li>TypeScript</li>
                <li>Nx Monorepo</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
          </div>

          <p id="love">Built with ❤️ using modern web technologies</p>
        </div>
      </div>
    </div>
  );
}
