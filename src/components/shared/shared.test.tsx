// @vitest-environment jsdom
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CopyButton } from './CopyButton';
import { SampleButton } from './SampleButton';
import { InputPane } from './InputPane';
import { ErrorAlert } from './ErrorAlert';
import { FileDropzone } from './FileDropzone';
import { OutputPane, sanitizePreview } from './OutputPane';
import { ToolLayout } from './ToolLayout';
import { Wrench } from 'lucide-react';
describe('shared components', () => {
  it('copies output explicitly', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });
    render(<CopyButton text="hello" />);
    fireEvent.click(screen.getByRole('button', { name: 'Copy' }));
    expect(writeText).toHaveBeenCalledWith('hello');
  });
  it('loads samples only on request', () => {
    const load = vi.fn();
    render(<SampleButton onClick={load} />);
    expect(load).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: 'Load sample' }));
    expect(load).toHaveBeenCalledOnce();
  });
  it('provides a labelled editor', () => {
    const change = vi.fn();
    render(<InputPane value="" onChange={change} />);
    fireEvent.change(screen.getByLabelText('Input'), {
      target: { value: 'hi' },
    });
    expect(change).toHaveBeenCalledWith('hi');
  });
  it('announces errors', () => {
    render(<ErrorAlert message="Invalid input" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Invalid input');
  });
  it('loads a local file', () => {
    const load = vi.fn();
    render(<FileDropzone onFile={load} />);
    const file = new File(['hello'], 'local.txt');
    fireEvent.change(screen.getByLabelText('Upload file'), {
      target: { files: [file] },
    });
    expect(load).toHaveBeenCalledWith(file);
  });
  it('renders a read-only output', () => {
    render(<OutputPane result={{ text: 'output' }} busy={false} />);
    expect(screen.getByLabelText('Output')).toHaveAttribute('readonly');
  });
  it('removes active and remote preview content', () => {
    const clean = sanitizePreview(
      '<img src="https://example.com/x"><script>alert(1)</script><a href="https://example.com">safe</a><div style="background:url(https://example.com)">text</div>',
    );
    expect(clean).not.toMatch(/src=|href=|style=|script|img/);
    expect(clean).toContain('safe');
  });
  it('provides a tool heading', () => {
    render(
      <ToolLayout
        meta={{
          id: 'test',
          name: 'Test tool',
          description: 'Description',
          category: 'Text',
          keywords: ['test'],
          icon: Wrench,
        }}
      >
        Body
      </ToolLayout>,
    );
    expect(screen.getByRole('heading', { name: 'Test tool' })).toBeVisible();
  });
});
