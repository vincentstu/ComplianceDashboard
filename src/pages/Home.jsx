import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import RiskPage from "../components/RiskPage";

// Home page component that displays the header and risk page
function Home({ companies }) {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader />
      <RiskPage companies={companies} />
    </div>
  );
}

export default Home;
