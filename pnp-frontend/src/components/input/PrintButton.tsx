import { Button } from './Button';

export const PrintButton = () => {
  const triggerPrintDialog = () => {
    try {
      // Print for Safari browser
      document.execCommand('print', false, null);
    } catch {
      window.print();
    }
  };

  return (
    <Button variant="secondary" onClick={triggerPrintDialog} title="Works best with Google Chrome">
      Save as PDF
    </Button>
  );
};
