import '@testing-library/jest-dom';

// tests using AntDesign's Select component fail because window.matchMedia doesn't exists
// there were a couple of issues opened on AntDesing's github page but they
// were closed and suggested this workaround
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
