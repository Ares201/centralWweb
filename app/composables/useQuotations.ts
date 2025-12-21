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

export interface Quotation {
  id: string
  name: string
  phone: string
  comment: string
  createdAt: Date
}

export const useQuotations = () => {
  const { $db } = useNuxtApp()

  const quotations = ref<Quotation[]>([])
  const loading = ref(true)

  const loadQuotations = async () => {
    try {
      const querySnapshot = await getDocs(collection($db, 'quotations'))
      quotations.value = querySnapshot.docs.map(d => {
        const data = d.data()
        return {
          id: d.id,
          name: data.name,
          phone: data.phone,
          comment: data.comment,
          createdAt: data.createdAt.toDate(),
        } as Quotation
      })
    } catch (error) {
      console.error('Error loading quotations:', error)
    } finally {
      loading.value = false
    }
  }

  onMounted(loadQuotations)

  const addQuotation = async (
    quotationData: Omit<Quotation, 'id' | 'createdAt'>
  ) => {
    await addDoc(collection($db, 'quotations'), {
      ...quotationData,
      createdAt: Timestamp.now(),
    })
    await loadQuotations()
  }

  const updateQuotation = async (
    id: string,
    updates: Partial<Omit<Quotation, 'id' | 'createdAt'>>
  ) => {
    await updateDoc(doc($db, 'quotations', id), updates)
    await loadQuotations()
  }

  const deleteQuotation = async (id: string) => {
    await deleteDoc(doc($db, 'quotations', id))
    quotations.value = quotations.value.filter(q => q.id !== id)
  }

  return {
    quotations: readonly(quotations),
    addQuotation,
    updateQuotation,
    deleteQuotation,
  }
}