test('index', async () => {
  globalThis.chrome = {
    devtools: {
      panels: {
        create: jest.fn(),
      },
    },
  } as unknown as typeof chrome;

  await import('./index');

  expect(chrome.devtools.panels.create).toHaveBeenCalled();
});
