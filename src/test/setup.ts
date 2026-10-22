import '@testing-library/jest-dom/vitest';
import { webcrypto } from 'node:crypto';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
Object.defineProperty(globalThis, 'crypto', { value: webcrypto });
afterEach(cleanup);
