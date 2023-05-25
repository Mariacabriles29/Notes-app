import { Header } from "./header/Header";

interface Props {
  children: JSX.Element | JSX.Element[];
}
export const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
