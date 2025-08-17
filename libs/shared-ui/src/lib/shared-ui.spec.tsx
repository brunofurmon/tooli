import { render } from '@testing-library/react';

import TooliSharedUi from './shared-ui';

describe('TooliSharedUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TooliSharedUi />);
    expect(baseElement).toBeTruthy();
  });
});
