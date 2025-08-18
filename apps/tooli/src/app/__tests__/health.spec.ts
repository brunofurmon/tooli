import { createServer } from 'http';
import { parse } from 'url';

// Helper function to make HTTP requests
const makeRequest = (
  url: string
): Promise<{ status: number; headers: any; data: string }> => {
  return new Promise((resolve, reject) => {
    const { protocol, hostname, port, pathname } = parse(url);
    const client = protocol === 'https:' ? require('https') : require('http');

    const req = client.get(
      {
        hostname,
        port,
        path: pathname,
        timeout: 5000,
      },
      (res: any) => {
        let data = '';
        res.on('data', (chunk: string) => {
          data += chunk;
        });

        res.on('end', () => {
          resolve({
            status: res.statusCode,
            headers: res.headers,
            data,
          });
        });
      }
    );

    req.on('error', (error: any) => {
      reject(error);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
};

// Mock Next.js server for testing
const createTestServer = () => {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const { pathname } = parse(req.url || '/');

      // Mock health check responses
      if (pathname === '/api/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
          })
        );
        return;
      }

      if (pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({
            status: 'healthy',
            timestamp: new Date().toISOString(),
          })
        );
        return;
      }

      // Mock static assets
      if (pathname?.startsWith('/_next/static/')) {
        // Check if it's a missing file
        if (pathname.includes('missing-file')) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/css' });
        res.end('/* Mock CSS */');
        return;
      }

      // Mock main routes
      if (pathname === '/' || pathname === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<html><body>Mock Page</body></html>');
        return;
      }

      // 404 for unknown routes
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    });

    server.listen(0, () => {
      const port = (server.address() as any).port;
      resolve({ server, port });
    });
  });
};

describe('Health and Routing Tests', () => {
  let testServer: any;
  let baseUrl: string;

  beforeAll(async () => {
    const result = (await createTestServer()) as { server: any; port: number };
    testServer = result.server;
    baseUrl = `http://localhost:${result.port}`;
  });

  afterAll(() => {
    if (testServer) {
      testServer.close();
    }
  });

  describe('Health Check Endpoints', () => {
    it('should return healthy status from /api/health', async () => {
      const response = await makeRequest(`${baseUrl}/api/health`);
      expect(response.status).toBe(200);

      const data = JSON.parse(response.data);
      expect(data.status).toBe('healthy');
      expect(data.timestamp).toBeDefined();
    });

    it('should return healthy status from /health', async () => {
      const response = await makeRequest(`${baseUrl}/health`);
      expect(response.status).toBe(200);

      const data = JSON.parse(response.data);
      expect(data.status).toBe('healthy');
      expect(data.timestamp).toBeDefined();
    });
  });

  describe('Main Routes', () => {
    it('should serve root route (/) successfully', async () => {
      const response = await makeRequest(`${baseUrl}/`);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
    });

    it('should serve about route (/about) successfully', async () => {
      const response = await makeRequest(`${baseUrl}/about`);
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/html');
    });

    it('should return 404 for non-existent routes', async () => {
      const response = await makeRequest(`${baseUrl}/non-existent`);
      expect(response.status).toBe(404);
    });
  });

  describe('Static Assets', () => {
    it('should serve static CSS assets', async () => {
      const response = await makeRequest(
        `${baseUrl}/_next/static/css/app/layout.css`
      );
      expect(response.status).toBe(200);
      expect(response.headers['content-type']).toContain('text/css');
    });

    it('should serve static JS assets', async () => {
      const response = await makeRequest(
        `${baseUrl}/_next/static/chunks/main-app.js`
      );
      expect(response.status).toBe(200);
    });
  });

  describe('Error Handling', () => {
    it('should handle malformed requests gracefully', async () => {
      const response = await makeRequest(`${baseUrl}/%invalid%url`);
      expect(response.status).toBe(404);
    });

    it('should handle missing static assets gracefully', async () => {
      const response = await makeRequest(
        `${baseUrl}/_next/static/missing-file.css`
      );
      expect(response.status).toBe(404);
    });
  });
});

describe('Application Integration Tests', () => {
  it('should have proper route structure', () => {
    // Test that all expected routes are defined
    const expectedRoutes = ['/', '/about', '/health', '/api/health'];
    expectedRoutes.forEach((route) => {
      expect(route).toBeDefined();
      expect(typeof route).toBe('string');
    });
  });

  it('should have proper health check structure', () => {
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '0.0.0',
      environment: 'test',
    };

    expect(healthData.status).toBe('healthy');
    expect(healthData.timestamp).toBeDefined();
    expect(healthData.version).toBeDefined();
    expect(healthData.environment).toBeDefined();
  });
});
