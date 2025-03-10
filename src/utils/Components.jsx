import { Dashboard } from "../components/Dashboard"
import { SessionReport } from "../components/SessionReport"

const pages = {
    dashboard: <Dashboard />,
    session: <SessionReport />
}

export const getPageComponent = (page) => {
    return pages[page]
}