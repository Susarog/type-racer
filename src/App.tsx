import Content from "./components/Content";

const Header = () => {
  return <div id="header">Type Racer</div>;
};

const Footer = () => {
  return <div id="footer">Footer</div>;
};

function App() {
  return (
    <div className="container">
      <div className="racing-page">
        <Header />
        <Content />
        <Footer />
      </div>
    </div>
  );
}

export default App;
