import { useEffect, useState } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/layout/Layout"
import MainForm from "./components/form/MainForm"
import Courses from "./pages/Courses";

function App() {
  const [hasSubmittedForm, setHasSubmittedForm] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = window.localStorage.getItem("hasSubmittedMainForm") === "true"
      if (stored) {
        setHasSubmittedForm(true)
      }
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            hasSubmittedForm
              ? <Home />
              : <Navigate to="/form" replace />
          }
        />
        <Route
          path="form"
          element={<MainForm onSubmitted={() => setHasSubmittedForm(true)} />}
        />
        <Route path="courses" element={<Courses/>}  />
      </Route>
    </Routes>
  )
}

export default App
