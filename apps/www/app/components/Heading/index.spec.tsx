import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import '@testing-library/jest-dom';
import { Heading } from '.';

describe('Heading Component', () => {
  it('renders a section heading correctly', () => {
    render(<Heading level="section">Section Heading</Heading>);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Section Heading');
    // expect(heading).toHaveClass('innerStyle');
    // expect(heading).toHaveClass('dottedBackgroundStyle');
  });

  it('renders a partial heading correctly', () => {
    render(<Heading level="partial">Partial Heading</Heading>);

    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Partial Heading');
    // expect(heading).toHaveClass('partialStyle');
  });

  it('defaults to section level when no level is provided', () => {
    render(<Heading>Default Heading</Heading>);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Default Heading');
  });
});
