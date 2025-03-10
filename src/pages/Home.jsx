import { WorkUnderProgress } from "../components/WorkUnderProgress"
import usePageContext from "../store/PageStore"
import { getPageComponent } from "../utils/Components"

export const Home = () => {
    const { page } = usePageContext();
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <WorkUnderProgress />
      {getPageComponent(page)}
    </div>
  )
}
