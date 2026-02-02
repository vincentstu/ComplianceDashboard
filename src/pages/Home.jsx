import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import RiskPage from "../components/RiskPage";

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
