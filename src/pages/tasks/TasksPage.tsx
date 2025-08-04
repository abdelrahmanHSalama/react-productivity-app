// Comment

import TasksPageContent from '@/components/ui/Tasks/TasksPageContent'
import { TasksListsProvider } from '@/services/context/TasksListContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const TasksPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 60 * 1000,
        retry: 2,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <TasksListsProvider>
        <TasksPageContent />
      </TasksListsProvider>
    </QueryClientProvider>
  )
}

export default TasksPage
