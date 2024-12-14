import type { NextPage } from 'next';
import React from 'react';
import { CenterContent } from '../../components';
import Colors from '../../components/dev/Colors';
import Buttons from '../../components/dev/Buttons';
import Link from 'next/link';
import SpeechBubbles from '../../components/dev/SpeechBubbles';
import FormElements from '../../components/dev/FormElements';
import Loading from '../../components/dev/Loading';
import Icons from '../../components/dev/Icons';

const DevPage: NextPage = () => {
  return (
    <main style={{ marginBottom: '4rem' }}>
      <CenterContent>
        <h1>Components and assets</h1>
        <Link href="/">
          <a>Go back home</a>
        </Link>
        <Loading />
        <Icons />
        <FormElements />
        <Colors />
        <SpeechBubbles />
        <Buttons />
      </CenterContent>
    </main>
  );
};

export default DevPage;
