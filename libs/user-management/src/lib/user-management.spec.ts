import { UserManager } from './user-management';

describe('userManagement', () => {
  it('should work', () => {
    const userManager = new UserManager();
    expect(userManager).toBeInstanceOf(UserManager);
  });
});
