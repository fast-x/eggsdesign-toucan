import { Label } from '../Typography';

type Props = {
  visibleEntries: number;
  totalEntries: number;
};

export default function CardGridUtilities({ visibleEntries, totalEntries }: Props) {
  return (
    <Label
      style={{
        marginTop: '1em',
        marginBottom: '0.5em',
      }}>
      Showing {visibleEntries} of {totalEntries}
    </Label>
  );
}
