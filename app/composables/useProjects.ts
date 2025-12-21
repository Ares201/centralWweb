import { db } from '../config/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore'

export interface Project {
  id: string
  title: string
  description: string
  type: 'web' | 'app' | 'excel' | 'other'
  status: 'planning' | 'in-progress' | 'completed'
  downloadLink?: string
  imageUrl?: string
  views: number
  createdAt: Date
  updatedAt: Date
}

export const useProjects = () => {
  const projects = ref<Project[]>([])
  const loading = ref(true)

  const loadProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'))
      projects.value = querySnapshot.docs.map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          title: data.title,
          description: data.description,
          type: data.type,
          status: data.status,
          downloadLink: data.downloadLink,
          imageUrl: data.imageUrl,
          views: data.views || 0,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate()
        } as Project
      })
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(() => {
    loadProjects()
  })

  const searchQuery = ref('')
  const selectedType = ref<string>('all')
  const selectedStatus = ref<string>('all')

  const filteredProjects = computed(() => {
    return projects.value.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesType = selectedType.value === 'all' || project.type === selectedType.value
      const matchesStatus = selectedStatus.value === 'all' || project.status === selectedStatus.value
      return matchesSearch && matchesType && matchesStatus
    })
  })

  const addProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const docRef = await addDoc(collection(db, 'projects'), {
        ...projectData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      })
      await loadProjects()
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const updateProject = async (id: string, updates: Partial<Omit<Project, 'id' | 'createdAt'>>) => {
    try {
      await updateDoc(doc(db, 'projects', id), {
        ...updates,
        updatedAt: Timestamp.now()
      })
      const index = projects.value.findIndex(p => p.id === id)
      if (index !== -1) {
        projects.value[index] = { ...projects.value[index], ...updates, updatedAt: new Date() } as Project
      }
    } catch (error) {
      console.error('Error updating project:', error)
    }
  }

  const deleteProject = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id))
      const index = projects.value.findIndex(p => p.id === id)
      if (index !== -1) {
        projects.value.splice(index, 1)
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  const updateProjectStatus = (id: string, status: Project['status']) => {
    updateProject(id, { status })
  }

  const incrementViews = async (id: string) => {
    try {
      const project = projects.value.find(p => p.id === id)
      if (project) {
        const newViews = project.views + 1
        await updateDoc(doc(db, 'projects', id), {
          views: newViews
        })
        project.views = newViews
      }
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }

  return {
    projects: readonly(projects),
    filteredProjects,
    searchQuery,
    selectedType,
    selectedStatus,
    addProject,
    updateProject,
    deleteProject,
    updateProjectStatus,
    incrementViews
  }
}