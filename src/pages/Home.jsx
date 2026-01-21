import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import RiskPage from "../components/RiskPage";

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <PageHeader />
      <RiskPage />
    </div>
  );
}

export default Home;
