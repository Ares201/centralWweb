import { onMounted, ref, readonly } from 'vue'
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from 'firebase/firestore'

export interface User {
  id: string
  username: string
  password: string
  role: 'admin' | 'user'
  createdAt: Date
  updatedAt: Date
}

export const useUsers = () => {
  const { $db } = useNuxtApp()

  const users = ref<User[]>([])
  const loading = ref(true)

  const loadUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, 'users'))
      users.value = querySnapshot.docs.map(d => {
        const data = d.data()
        return {
          id: d.id,
          username: data.username,
          password: data.password,
          role: data.role || 'user',
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        } as User
      })
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(loadUsers)

  const searchQuery = ref('')
  const selectedRole = ref<string>('all')

  const filteredUsers = computed(() =>
    users.value.filter(user => {
      const matchesSearch =
        user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.value.toLowerCase())

      const matchesRole =
        selectedRole.value === 'all' || user.role === selectedRole.value

      return matchesSearch && matchesRole
    })
  )

  const addUser = async (
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    await addDoc(collection($db, 'users'), {
      ...userData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    await loadUsers()
  }

  const updateUser = async (
    id: string,
    updates: Partial<Omit<User, 'id' | 'createdAt'>>
  ) => {
    await updateDoc(doc($db, 'users', id), {
      ...updates,
      updatedAt: Timestamp.now(),
    })
    await loadUsers()
  }

  const deleteUser = async (id: string) => {
    await deleteDoc(doc($db, 'users', id))
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users: readonly(users),
    filteredUsers,
    searchQuery,
    selectedRole,
    addUser,
    updateUser,
    deleteUser,
  }
}