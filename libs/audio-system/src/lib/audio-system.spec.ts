import { audioSystem } from './audio-system.js';

describe('audioSystem', () => {
  it('should work', () => {
    expect(audioSystem()).toEqual('audio-system');
  });
});
