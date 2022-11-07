import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

export default function Window({children}: PropsWithChildren<{}>) {
	return (
		<Container>
			{children}
		</Container>
	);
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  height: 100%;
  background-color: #080420;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 10% 80% 10%;
  }
`;
