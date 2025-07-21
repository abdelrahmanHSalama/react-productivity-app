import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './components/layouts'
import TasksPage from './pages/tasks/TasksPage'

// import { useGetPostsQuery } from './services/api'

function App() {
  // const [posts, setPosts] = useState<any>([])
  // const [error, setError] = useState<any>(null)
  // const [loading, setLoading] = useState<boolean>(true)

  // const { data: posts, error, isLoading: loading, refetch } = useGetPostsQuery()

  // useEffect(() => {
  //   getPosts()
  //     .then((data) => setPosts(data))
  //     .catch((err) => setError(err))
  //     .finally(() => setLoading(false))
  // }, [])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="tasks" element={<TasksPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
