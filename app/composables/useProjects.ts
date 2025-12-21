import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'

export interface Project {
  id: string
  title: string
  description: string
  type: 'web' | 'app' | 'excel' | 'other'
  status: 'planning' | 'in-progress' | 'completed'
  downloadLink?: string
  imageUrl?: string
  views: number
  viewsTiktok: number
  downloads: number
  tiktokLink?: string
  difficulty?: string
  estimatedTime?: string
  documentationLink?: string
  demoLink?: string
  createdAt: Date
  updatedAt: Date
}

export const useProjects = () => {
  const { $db } = useNuxtApp()

  const projects = ref<Project[]>([])
  const loading = ref(true)

  const loadProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, 'projects'))
      projects.value = querySnapshot.docs.map(d => {
        const data = d.data()
        return {
          id: d.id,
          title: data.title,
          description: data.description,
          type: data.type,
          status: data.status,
          downloadLink: data.downloadLink,
          imageUrl: data.imageUrl,
          views: data.views || 0,
          viewsTiktok: data.viewsTiktok || 0,
          downloads: data.downloads || 0,
          tiktokLink: data.tiktokLink,
          difficulty: data.difficulty,
          estimatedTime: data.estimatedTime,
          documentationLink: data.documentationLink,
          demoLink: data.demoLink,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as Project
      })
    } catch (error) {
      console.error('Error loading projects:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(loadProjects)

  const searchQuery = ref('')
  const selectedType = ref<string>('all')
  const selectedStatus = ref<string>('all')

  const filteredProjects = computed(() =>
    projects.value.filter(project => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesType =
        selectedType.value === 'all' || project.type === selectedType.value

      const matchesStatus =
        selectedStatus.value === 'all' || project.status === selectedStatus.value

      return matchesSearch && matchesType && matchesStatus
    })
  )

  const addProject = async (
    projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    await addDoc(collection($db, 'projects'), {
      ...projectData,
      dowload: 0,
      viewsTiktok: 0,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    await loadProjects()
  }

  const updateProject = async (
    id: string,
    updates: Partial<Omit<Project, 'id' | 'createdAt'>>
  ) => {
    await updateDoc(doc($db, 'projects', id), {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    await loadProjects()
  }

  const deleteProject = async (id: string) => {
    await deleteDoc(doc($db, 'projects', id))
    projects.value = projects.value.filter(p => p.id !== id)
  }

  const updateProjectStatus = (id: string, status: Project['status']) => {
    return updateProject(id, { status })
  }

  const incrementViews = async (id: string) => {
    const project = projects.value.find(p => p.id === id)
    if (!project) return

    const newViews = project.views + 1
    await updateDoc(doc($db, 'projects', id), { views: newViews })
    project.views = newViews
  }

  const incrementViewsTiktok = async (id: string) => {
    const project = projects.value.find(p => p.id === id)
    if (!project) return

    const newViews = project.viewsTiktok + 1
    await updateDoc(doc($db, 'projects', id), { viewsTiktok: newViews })
    project.viewsTiktok = newViews
  }

  const incrementDownloads = async (id: string) => {
    const project = projects.value.find(p => p.id === id)
    if (!project) return

    const newDownloads = (project.downloads || 0) + 1
    await updateDoc(doc($db, 'projects', id), { downloads: newDownloads })
    project.downloads = newDownloads
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
    incrementViews,
    incrementViewsTiktok,
    incrementDownloads,
  }
}
