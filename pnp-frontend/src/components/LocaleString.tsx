import useTranslation from '../utils/i18n/useTranslation';

type Props = Record<Language, string>;

const LocaleString = (props: Props) => {
  const { localeString } = useTranslation();

  return <>{localeString(props)}</>;
};

export default LocaleString;
