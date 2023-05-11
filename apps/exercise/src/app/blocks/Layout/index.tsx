import styled from 'styled-components';

// TODO: move to theme
// blue gradient to light blue in right
const headerBackgroundColor =
  'linear-gradient(90deg, #2D9CDB 0%, #56CCF2 100%)';
const headerTextColor = '#fff';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    background: ${headerBackgroundColor};
    color: ${headerTextColor};
    padding: 0 2rem;

    h1 {
      font-size: 1.5rem;
      font-weight: 100;
    }
  }

  main {
    flex: 1;
    padding: 0 2rem;
  }
`;

export const Layout = ({
  title,
  children,
}: {
  title: string;
  children: JSX.Element[];
}) => {
  return (
    <StyledLayout>
      <header>
        <h1>{title}</h1>
      </header>
      <main>{children}</main>
    </StyledLayout>
  );
};
