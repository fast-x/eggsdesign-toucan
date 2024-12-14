import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { colors } from '../styles';
import { Heading3, Paragraph } from '../Typography';

const bugReportMail = {
  RECIPIENT: 'yolk@eggsdesign.com',
  SUBJECT: 'Yolk Bug Report',
  MAIL_BODY: `
--- I have a bug to report --- %0D%0A 
%0D%0A
%0D%0A
What happens: %0D%0A
[Describe how to replicate the bug] %0D%0A
%0D%0A
What I expected to happen instead: %0D%0A
[How the bug deviates from your expected behaviour] %0D%0A
%0D%0A
`,
};

const feedbackMail = {
  RECIPIENT: 'yolk@eggsdesign.com',
  SUBJECT: 'Yolk Feedback',
  MAIL_BODY: `
--- I have feedback / a feature request --- %0D%0A 
[Your text goes here]%0D%0A
%0D%0A
`,
};

const metadata = () => {
  return `
%0D%0A
%0D%0A
--- Extra meta information --- %0D%0A
Address: ${window.location.href} %0D%0A
Platform: ${navigator.platform} %0D%0A
Browser: ${navigator.appVersion}
`;
};

export default function FeedbackButton(): ReactElement {
  const [visible, setVisible] = React.useState(false);

  return (
    <Container className={visible ? 'visible' : 'hidden'}>
      <Title>
        Found a bug? Suggestion for improvement?{' '}
        <ToggleVisibility onClick={() => setVisible(!visible)}>{visible ? 'Hide' : 'Show'}</ToggleVisibility>
      </Title>
      <Paragraph>Please let us know with the feedback link below.</Paragraph>
      <Links>
        <FeedbackLink
          href={`mailto:${bugReportMail.RECIPIENT}?subject=${bugReportMail.SUBJECT}&body=${
            bugReportMail.MAIL_BODY
          } ${metadata()}`}>
          Report bug
        </FeedbackLink>
        <FeedbackLink
          href={`mailto:${feedbackMail.RECIPIENT}?subject=${feedbackMail.SUBJECT}&body=${feedbackMail.MAIL_BODY}`}>
          Give feedback
        </FeedbackLink>
      </Links>
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  bottom: 0;
  right: 10px;
  padding: 20px 20px 40px;
  border-radius: 4px 4px 0 0;
  background-color: ${colors.neutral1};
  color: white;
  z-index: 100;

  transition: all 0.2s cubic-bezier(0.03, 0.76, 0.02, 0.98);
  will-change: transform;

  &.hidden {
    transform: translateY(calc(100% - 4rem));
  }

  @media (max-width: 800px) {
    display: none;
  }

  @media print {
    display: none;
  }
`;

const Links = styled.div`
  display: flex;
  gap: 20px;
`;

const Title = styled(Heading3)`
  margin-top: 0;
`;

const FeedbackLink = styled.a`
  color: inherit;
  margin-top: 20px;
  display: inline-block;
`;

const ToggleVisibility = styled.button`
  padding: 8px 20px;
  margin-left: 16px;
  border-radius: 2rem;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  cursor: pointer;
  min-width: 6em;
  /* position: absolute; */
  /* top: 6px;
  left: 50%;
  transform: translateX(-50%); */

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
