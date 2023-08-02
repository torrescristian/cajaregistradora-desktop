import BottomNav from './BottomNav';
import Navbar from './Navbar';

interface IProps {
  children: React.ReactNode;
}
export default function GlobalLayout({ children }: IProps) {
  return (
    <section
      className="container md:flex md:flex-col md:items-center md:gap-y-5"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Navbar />
      {children}
      <BottomNav />
    </section>
  );
}
