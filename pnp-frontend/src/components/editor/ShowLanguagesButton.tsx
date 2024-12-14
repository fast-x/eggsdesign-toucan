import { Button } from '../input/Button';
import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons';

interface Props {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
}

export function ShowLanguagesButton(props: Props) {
  return (
    <Button
      variant={'simple'}
      size="compact"
      onClick={() => props.setExpanded(!props.expanded)}
      style={{
        marginTop: '8px',
        marginBottom: '8px',
      }}>
      {props.expanded ? 'Hide' : 'Show'} other languages {props.expanded ? <CaretUpIcon /> : <CaretDownIcon />}
    </Button>
  );
}
