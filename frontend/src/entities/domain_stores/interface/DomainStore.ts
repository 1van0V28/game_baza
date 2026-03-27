import type { Ref } from "vue"


export interface IDomainStore<T> {
	data: Ref<T | null>
    error: Ref<string | null>
    isPending: Ref<boolean, boolean>
    setData: (newData: T | null) => void
    setError: (newError: string | null) => void
    setIsPending: (newIsPending: boolean) => void
}